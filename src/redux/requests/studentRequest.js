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

    addStudent: builder.mutation({
      query: (values) => ({
        url: `/students`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["students"],
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
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = extendedApiSlice;
