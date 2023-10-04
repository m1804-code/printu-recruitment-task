import { createSlice } from "@reduxjs/toolkit"
import { rectanglesInitialState } from "./RectanglesTypes"

export const RectanglesSlice = createSlice({
  name: "rectangles ",
  initialState: rectanglesInitialState,
  reducers: {
    itemTypeAdded: (state, action) => {
      state.itemTypes.push(action.payload)
    },
    projectFetched: (state, action) => {
      state.project = action.payload
      state.error = null
    },
    errorSet: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { projectFetched, itemTypeAdded, errorSet } =
  RectanglesSlice.actions

export default RectanglesSlice.reducer
