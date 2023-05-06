import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [['Node 1', ['Node 2', ['Node 3'], ['Node 4']], ['Node 5']]],
}

const findNodeToInteract = (arr, node) => {
  const rand = Math.round(Math.random() * 10000)
  arr.forEach((el) => {
    if (Array.isArray(el)) {
      findNodeToInteract(el, node)
      if (el[0] === node) el.push([`${rand}`])
    }
  })
  return arr
}

export const nodesSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const updatedNodes = findNodeToInteract(state.nodes, action.payload)
      state.nodes = updatedNodes
    },
  },
})

export const { addNode } = nodesSlice.actions
export default nodesSlice.reducer
