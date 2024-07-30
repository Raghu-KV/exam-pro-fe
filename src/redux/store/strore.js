import { configureStore } from "@reduxjs/toolkit";

import navStateReducer from "../reducers/nav-reducer";

import prepareQuestionReducer from "../reducers/prepareQuestion-reducer";

import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    navState: navStateReducer,
    prepareQuestions: prepareQuestionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
