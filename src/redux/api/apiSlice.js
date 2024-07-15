// import { createApi } from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["exam-type"],
  endpoints: (builder) => ({}),
});

export const { useGetTestApiQuery } = apiSlice;
