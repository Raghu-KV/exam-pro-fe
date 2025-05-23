import { apiSlice } from "../api/apiSlice";
import { setAllQuestions } from "../reducers/prepareQuestion-reducer";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/tests${filterOptions}` : `/tests`;
      },
      providesTags: ["tests"],
    }),

    getAllQuestionsForTest: builder.query({
      query: ({ id, filterOptions }) => {
        return filterOptions
          ? `/tests/${id}/getQuestions${filterOptions}`
          : `/tests/${id}/getQuestions`;
      },
    }),

    getAllIncompleteStudents: builder.query({
      query: ({ id, filterOptions }) =>
        `/tests/${id}/getIncompleteStudents${filterOptions}`,
    }),

    getAllCompletedStudents: builder.query({
      query: ({ id, filterOptions }) =>
        `/tests/${id}/getCompletedStudents${filterOptions}`,
    }),
    getTestPrefill: builder.query({
      query: (id) => `/tests/${id}/prefill`,
      providesTags: ["single-test"],
    }),

    getSingleTest: builder.query({
      query: (id) => `/tests/${id}`,
      providesTags: ["single-test"],
    }),

    getAllQuestionNoPagenation: builder.query({
      query: (id) => `/tests/${id}/getQuestionsNoPagination`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllQuestions(data));
        } catch (error) {
          console.log(error);
        }
      },
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

    chagePublish: builder.mutation({
      query: (id) => ({
        url: `/tests/${id}/publish`,
        method: "POST",
      }),
      invalidatesTags: ["single-test"],
    }),

    updateQuestions: builder.mutation({
      query: ({ id, questionsId }) => ({
        url: `/tests/${id}/updateQuestions`,
        method: "PATCH",
        body: { questionsId },
      }),
      invalidatesTags: ["single-test"],
    }),
  }),
});

export const {
  useLazyGetAllTestsQuery,
  useLazyGetAllQuestionsForTestQuery,
  useLazyGetAllQuestionNoPagenationQuery,
  useLazyGetAllCompletedStudentsQuery,
  useLazyGetAllIncompleteStudentsQuery,
  useGetTestPrefillQuery,
  useGetSingleTestQuery,
  useAddTestMutation,
  useDeleteTestMutation,
  useUpdateTestMutation,
  useUpdateTimeMutation,
  useChagePublishMutation,
  useUpdateQuestionsMutation,
} = extendedApiSlice;
