import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: (filteredOptions) => {
        return filteredOptions ? `/subjects${filteredOptions}` : `/subjects`;
      },
      providesTags: ["subjetcts"],
    }),

    getSingleSubject: builder.query({
      query: (id) => `/subjects/${id}`,
      providesTags: ["single-subject"],
    }),

    getAllSubjectsForDropDown: builder.query({
      query: () => `/subjects/all`,
    }),

    getSingleSubjectView: builder.query({
      query: (values) => {
        return values.search
          ? `/subjects/view/${values.id}${values.search}`
          : `/subjects/view/${values.id}`;
      },
    }),
    postSubject: builder.mutation({
      query: (values) => ({
        url: `/subjects`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["subjetcts", "single-subject"],
    }),

    updateSubject: builder.mutation({
      query: ({ id, values }) => ({
        url: `/subjects/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["subjetcts", "single-subject"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subjetcts", "single-subject"],
    }),
  }),
});

export const {
  useLazyGetAllSubjectsQuery,
  useLazyGetAllSubjectsForDropDownQuery,
  useLazyGetSingleSubjectViewQuery,
  useGetSingleSubjectQuery,
  usePostSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = extendedApiSlice;
