import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { nodesSlice } from '../features/nodesSlice'

const rootReducer = combineReducers({
  nodes: nodesSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
