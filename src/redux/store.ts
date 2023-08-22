import { configureStore } from '@reduxjs/toolkit'
import ListElementSliceReducer from './ListElementSlice'
import SearchSlice  from './searchSlice';

export const store = configureStore({
  reducer: {
    listElement: ListElementSliceReducer,
    searchElement: SearchSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;