import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

// Combine your feature slices here
const rootReducer = combineReducers({
  counter: counterReducer,
  // TODO: add more slices here
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer 