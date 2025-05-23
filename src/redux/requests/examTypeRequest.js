import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamType: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/exam-type${filterOptions}` : `/exam-type`;
      },

      providesTags: ["exam-type"],
    }),

    getExamTypeForDropDown: builder.query({
      query: () => `/exam-type/all`,
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

    deleteExamType: builder.mutation({
      query: (id) => ({
        url: `/exam-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["exam-type"],
    }),
  }),
});

export const {
  useLazyGetExamTypeQuery,
  useLazyGetExamTypeForDropDownQuery,
  useGetExamTypeByIdQuery,
  useUpdateExamTypeMutation,
  useAddExamTypeMutation,
  useDeleteExamTypeMutation,
} = extendedApiSlice;
