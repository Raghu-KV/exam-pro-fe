import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/tests${filterOptions}` : `/tests`;
      },
      providesTags: ["tests"],
    }),

    getTestPrefill: builder.query({
      query: (id) => `/tests/${id}/prefill`,
      providesTags: ["single-test"],
    }),

    getSingleTest: builder.query({
      query: (id) => `/tests/${id}`,
      providesTags: ["single-test"],
    }),

    addTest: builder.mutation({
      query: (values) => ({
        url: `/tests`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["tests"],
    }),

    updateTest: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tests/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["tests", "single-test"],
    }),

    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/tests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tests"],
    }),

    updateTime: builder.mutation({
      query: ({ id, values }) => ({
        url: `/tests/${id}/updateTiming`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["single-test"],
    }),
  }),
});

export const {
  useLazyGetAllTestsQuery,
  useGetTestPrefillQuery,
  useGetSingleTestQuery,
  useAddTestMutation,
  useDeleteTestMutation,
  useUpdateTestMutation,
  useUpdateTimeMutation,
} = extendedApiSlice;
