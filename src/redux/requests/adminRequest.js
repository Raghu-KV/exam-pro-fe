import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/auth",
        method: "POST",
        body: values,
      }),
      transformResponse: (responce, meta) => {
        localStorage.setItem("auth-token", responce.accessToken);
        return responce;
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.clear();
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: `/auth/refresh`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  extendedApiSlice;
