// import { createApi } from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  //   tagTypes: [],
  endpoints: (builder) => ({}),
});

export const { useGetTestApiQuery } = apiSlice;
