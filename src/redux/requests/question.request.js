import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestion: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/questions${filterOptions}` : `/questions`;
      },
      providesTags: ["questions"],
    }),

    getSingleQuestion: builder.query({
      query: (id) => `/questions/${id}`,
      providesTags: ["single-question"],
    }),

    getCloudinarySign: builder.mutation({
      query: () => ({
        url: `/questions/generateSignature`,
        method: "POST",
      }),
    }),

    addQuestion: builder.mutation({
      query: (values) => ({
        url: `/questions`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["questions"],
    }),

    editQuestion: builder.mutation({
      query: ({ id, values }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["questions", "single-question"],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions", "single-question"],
    }),
  }),
});

export const {
  useLazyGetAllQuestionQuery,
  useGetSingleQuestionQuery,
  useGetCloudinarySignMutation,
  useAddQuestionMutation,
  useEditQuestionMutation,
  useDeleteQuestionMutation,
} = extendedApiSlice;
