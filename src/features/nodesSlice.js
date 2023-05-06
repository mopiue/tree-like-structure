import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [['Node 1', ['Node 2', ['Node 3'], ['Node 4']], ['Node 5']]],
}

export const nodesSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
})

export default nodesSlice.reducer
