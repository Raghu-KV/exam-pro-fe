import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (values) => ({
        url: `/users/changePassword`,
        method: "POST",
        body: values,
      }),
    }),
    getPaymentDeatils: builder.query({
      query: () => `/users/payments`,
    }),
  }),
});

export const { useChangePasswordMutation, useGetPaymentDeatilsQuery } =
  extendedApiSlice;
