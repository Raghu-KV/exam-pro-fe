import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamType: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/exam-type${filterOptions}` : `/exam-type`;
      },

      providesTags: ["exam-type"],
    }),

    getExamTypeById: builder.query({
      query: (id) => `/exam-type/${id}`,
      providesTags: ["exam-type-single"],
    }),

    updateExamType: builder.mutation({
      query: ({ id, values }) => ({
        url: `/exam-type/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["exam-type", "exam-type-single"],
    }),

    addExamType: builder.mutation({
      query: (values) => ({
        url: `/exam-type`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["exam-type", "exam-type-single"],
    }),
  }),
});

export const {
  useLazyGetExamTypeQuery,
  useGetExamTypeByIdQuery,
  useUpdateExamTypeMutation,
  useAddExamTypeMutation,
} = extendedApiSlice;
