// import { createApi } from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: [
    "exam-type",
    "exam-type-single",
    "students",
    "single-student",
    "subjetcts",
    "single-subject",
    "chapters",
    "single-chapter",
  ],
  endpoints: (builder) => ({}),
});

export const { useGetTestApiQuery } = apiSlice;
