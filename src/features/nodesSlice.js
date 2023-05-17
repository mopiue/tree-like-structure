import { createSlice } from '@reduxjs/toolkit'
import { findNodeAndChilds, clearDeletableIds } from '../helpers/treeUtils'

const initialState = {
  nodes: [],
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
      const nextId = getNextId(Object.values(state.nodes)) + 1
      findNodeToInteract(state.nodes, action.payload, nextId)

      if (nextId === 1) {
        state.current.id = 1
        state.current.value = 'Node 1'
      }
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

      state.current.id = null
      state.current.editableId = null
    },
    undoRemove: (state, action) => {
      const filtered = state.toRemove.filter(
        (item) =>
          item !== action.payload &&
          !Object.hasOwnProperty.call(item, action.payload)
      )
      state.current.id = action.payload
      state.toRemove = filtered
    },
    cleanNodes: (state, action) => {
      clearDeletableIds(state.nodes, state.toRemove)
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
