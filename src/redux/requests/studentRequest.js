import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/students${filterOptions}` : `/students`;
      },
      providesTags: ["students"],
    }),

    getStudentById: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["single-student"],
    }),

    getStudentDetailView: builder.query({
      query: (id) => `/students/view/${id}`,
      providesTags: ["student-detail-view"],
    }),

    getStudentCompletedTests: builder.query({
      query: ({ id, filterOptions }) =>
        `/students/completedTests/${id}${filterOptions}`,
    }),

    getStudentIncompleteTests: builder.query({
      query: ({ id, filterOptions }) =>
        `/students/incompleteTests/${id}${filterOptions}`,
    }),

    getStudentCompletedTestInsight: builder.query({
      query: ({ id, testId, filterOptions }) =>
        `/students/completedTests/${id}/insight/${testId}${filterOptions}`,
    }),

    addStudent: builder.mutation({
      query: (values) => ({
        url: `/students`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["students"],
    }),

    resetPassword: builder.mutation({
      query: (id) => ({
        url: `/students/resetPassword/${id}`,
        method: "PATCH",
      }),
    }),

    editStudent: builder.mutation({
      query: ({ id, values }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["students", "single-student"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["students", "single-student"],
    }),
  }),
});

export const {
  useLazyGetAllStudentsQuery,
  useLazyGetStudentIncompleteTestsQuery,
  useLazyGetStudentCompletedTestsQuery,
  useLazyGetStudentCompletedTestInsightQuery,
  useGetStudentDetailViewQuery,
  useResetPasswordMutation,
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = extendedApiSlice;
