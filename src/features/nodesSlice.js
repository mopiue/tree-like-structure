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
  nestingMarginMultiplier: 25,
  currentSelectedNodeId: null,
  currentEditedNodeId: null,
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

const findNodeToInteract = (nodes, nodeId, nextId) => {
  if (nextId === 1) {
    nodes.push({
      id: 1,
      value: 'Node 1',
      children: [],
    })
    return
  }
  nodes.forEach((node) => {
    if (node.id === nodeId) {
      node.children.push({
        id: nextId,
        value: `Node ${nextId}`,
        children: [],
      })
    } else if (node.children) {
      findNodeToInteract(node.children, nodeId, nextId)
    }
  })
}

const removeNodeById = (id, nodes) => {
  const filteredNodes = Object.values(nodes).filter((node) => node.id !== id)

  Object.values(nodes).forEach((node) => {
    if (node.children.length > 0)
      node.children = removeNodeById(id, node.children)
  })

  return filteredNodes
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
    setSelectedNodeId: (state, action) => {
      state.currentSelectedNodeId = action.payload
    },
    addNode: (state, action) => {
      const nextId = getNextId(state.nodes) + 1
      findNodeToInteract(state.nodes, action.payload, nextId)

      if (nextId === 1) state.currentSelectedNodeId = 1
    },
    removeNode: (state, action) => {
      const updatedNodes = removeNodeById(action.payload, state.nodes)
      state.nodes = updatedNodes
      state.currentSelectedNodeId = null
    },
    resetNodes: (state, action) => {
      state.nodes = []
    },
    setEditedNodeId: (state, action) => {
      state.currentEditedNodeId = action.payload
    },
    saveEditedNode: (state, action) => {
      const isNodeEdited = editNodeById(
        action.payload.id,
        action.payload.value,
        state.nodes
      )
      if (isNodeEdited) state.currentEditedNodeId = null
    },
  },
})

export const {
  setSelectedNodeId,
  addNode,
  removeNode,
  resetNodes,
  setEditedNodeId,
  saveEditedNode,
} = nodesSlice.actions
export default nodesSlice.reducer
