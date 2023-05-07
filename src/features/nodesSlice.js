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
  nestingMultiplier: 25,
  currentSelectedNode: null,
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
    selectNode: (state, action) => {
      state.currentSelectedNode = action.payload
    },
    addNode: (state, action) => {
      const updatedNodes = findNodeToInteract(state.nodes, action.payload)
      state.nodes = updatedNodes
    },
  },
})

export const { addNode, selectNode } = nodesSlice.actions
export default nodesSlice.reducer
