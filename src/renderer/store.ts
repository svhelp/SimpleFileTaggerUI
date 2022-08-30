import { configureStore } from '@reduxjs/toolkit'
import mainLayoutReducer from 'components/logic/slice'

export const store = configureStore({
  reducer: {
    mainLayoutReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch