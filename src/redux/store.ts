import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import rectanglesReducer from "./Rectangles/RectanglesSlice"

export const store = configureStore({
  reducer: {
    rectangles: rectanglesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
