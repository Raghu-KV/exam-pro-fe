import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChapters: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/chapters${filterOptions}` : `/chapters`;
      },
      providesTags: ["chapters"],
    }),

    getAllChapterForDropDown: builder.query({
      query: () => `/chapters/all`,
    }),

    getChapterById: builder.query({
      query: (id) => `/chapters/${id}`,
      providesTags: ["single-chapter"],
    }),

    addChapter: builder.mutation({
      query: (values) => ({
        url: `/chapters`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["chapters"],
    }),

    editChapter: builder.mutation({
      query: ({ id, values }) => ({
        url: `/chapters/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["chapters", "single-chapter"],
    }),

    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/chapters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["chapters", "single-chapter"],
    }),
  }),
});

export const {
  useLazyGetAllChaptersQuery,
  useLazyGetAllChapterForDropDownQuery,
  useGetChapterByIdQuery,
  useAddChapterMutation,
  useEditChapterMutation,
  useDeleteChapterMutation,
} = extendedApiSlice;
