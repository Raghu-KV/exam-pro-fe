import { configureStore } from "@reduxjs/toolkit";

import navStateReducer from "../reducers/nav-reducer";

export const store = configureStore({
  reducer: {
    navState: navStateReducer,
  },
});
