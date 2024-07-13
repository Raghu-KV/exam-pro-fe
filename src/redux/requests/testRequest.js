import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    testApi: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useTestApiQuery } = extendedApiSlice;
