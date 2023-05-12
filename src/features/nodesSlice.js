import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [
    {
      id: 1,
      value: 'Node 1',
      children: [
        {
          id: 2,
          value: 'Node 2',
          children: [
            {
              id: 3,
              value: 'Node 3',
              children: [],
            },
            {
              id: 4,
              value: 'Node 4',
              children: [],
            },
          ],
        },
        {
          id: 5,
          value: 'Node 5',
          children: [],
        },
      ],
    },
  ],
  toRemove: [],
  nestingMarginMultiplier: 30,
  current: {
    id: null,
    editableId: null,
    value: '',
  },
}

const getNextId = (arr) => {
  let maxId = 0
  arr.forEach((node) => {
    if (node.id > maxId) {
      maxId = node.id
    }
    maxId = Math.max(maxId, getNextId(node.children))
  })
  return maxId
}

const createNodeToPush = (nextId) => {
  return {
    id: nextId,
    value: `Node ${nextId}`,
    children: [],
  }
}

const findNodeToInteract = (nodes, nodeId, nextId) => {
  if (nextId === 1) {
    nodes.push(createNodeToPush(nextId))
    return
  }
  nodes.forEach((node) => {
    if (node.id === nodeId) {
      node.children.push(createNodeToPush(nextId))
    } else if (node.children) {
      findNodeToInteract(node.children, nodeId, nextId)
    }
  })
}

const cleanNodesFromRemovesIds = (removes, nodes) => {
  const filteredNodes = Object.values(nodes).filter(
    (node) => !removes.includes(node.id)
  )

  filteredNodes.forEach((node) => {
    if (node.children.length > 0) {
      node.children = cleanNodesFromRemovesIds(removes, node.children)
    }
  })

  return filteredNodes
}

function findNodeAndChilds(nodeId, nodes) {
  function findNodeById(nodeId, nodes) {
    for (let node of nodes) {
      if (node.id === nodeId) {
        return node
      }
      if (node.children.length > 0) {
        let nestedNode = findNodeById(nodeId, node.children)
        if (nestedNode) {
          return nestedNode
        }
      }
    }
    return null
  }

  function getAllChildrenIds(node) {
    if (!node) {
      return null
    }
    const childIds = node.children.flatMap((child) => [
      child.id,
      ...getAllChildrenIds(child),
    ])
    return childIds
  }

  const node = findNodeById(nodeId, nodes)
  return getAllChildrenIds(node)
}

const editNodeById = (id, value, nodes) => {
  let isEdited = false
  Object.values(nodes).forEach((node) => {
    if (node.id === id) {
      node.value = value
      isEdited = true
    } else if (node.children) {
      const childEdited = editNodeById(id, value, node.children)
      if (childEdited) isEdited = true
    }
  })
  return isEdited
}

export const nodesSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setActiveNodeId: (state, action) => {
      state.current.id = action.payload
    },
    setActiveNodeValue: (state, action) => {
      state.current.value = action.payload
    },
    addNode: (state, action) => {
      const nextId = getNextId(state.nodes) + 1
      findNodeToInteract(state.nodes, action.payload, nextId)

      if (nextId === 1) state.current.id = 1
    },
    removeNode: (state, action) => {
      const toRemovesIds = findNodeAndChilds(
        action.payload,
        Object.values(state.nodes)
      )

      if (toRemovesIds.length > 0)
        state.toRemove.push({
          [action.payload]: [action.payload, ...toRemovesIds],
        })
      else state.toRemove.push(action.payload)

      // state.toRemove.push(action.payload)
      state.current.id = null
      state.current.editableId = null
    },
    undoRemove: (state, action) => {
      const filtered = state.toRemove.filter(
        (item) =>
          item !== action.payload &&
          !Object.hasOwnProperty.call(item, action.payload)
      )
      state.toRemove = filtered
    },
    cleanNodes: (state, action) => {
      state.nodes = cleanNodesFromRemovesIds(
        Object.values(state.toRemove),
        state.nodes
      )
      // state.toRemove = []
    },
    resetNodes: (state, action) => {
      state.nodes = []
      state.current.id = null
      state.current.editableId = null
    },
    setEditedNodeId: (state, action) => {
      state.current.editableId = action.payload
    },
    saveEditedNode: (state, action) => {
      const isNodeEdited = editNodeById(
        action.payload.id,
        action.payload.value,
        state.nodes
      )
      if (isNodeEdited) state.current.editableId = null
    },
  },
})

export const {
  setActiveNodeId,
  setActiveNodeValue,
  addNode,
  removeNode,
  cleanNodes,
  resetNodes,
  setEditedNodeId,
  saveEditedNode,
  undoRemove,
} = nodesSlice.actions
export default nodesSlice.reducer
