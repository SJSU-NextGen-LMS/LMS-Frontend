// src/lib/redux/store.ts
// Creating the Redux store with Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/state/slices'

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store 