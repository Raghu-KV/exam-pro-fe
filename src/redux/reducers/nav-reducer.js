import { createSlice } from "@reduxjs/toolkit";

const navState = createSlice({
  name: "navState",
  initialState: { value: true },
  reducers: {
    isNavOpen: (state, action) => {
      state.value = action.payload.value;
    },
  },
});

export const { isNavOpen } = navState.actions;

export default navState.reducer;
