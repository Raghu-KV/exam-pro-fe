import { configureStore } from "@reduxjs/toolkit";

import navStateReducer from "../reducers/nav-reducer";

import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    navState: navStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
