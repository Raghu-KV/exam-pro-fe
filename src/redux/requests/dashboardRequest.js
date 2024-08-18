import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => `/dashboard`,
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = extendedApiSlice;
