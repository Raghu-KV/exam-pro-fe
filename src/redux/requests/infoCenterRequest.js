import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInfos: builder.query({
      query: (filteredOptions) => {
        return `/infos${filteredOptions}`;
      },
    }),

    getSingleInfo: builder.query({
      query: (id) => `/infos/${id}`,
      providesTags: ["single-info"],
    }),

    postInfo: builder.mutation({
      query: (values) => ({
        url: `/infos`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["single-info"],
    }),

    updateInfo: builder.mutation({
      query: ({ id, values }) => ({
        url: `/infos/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["single-info"],
    }),

    deleteInfo: builder.mutation({
      query: (id) => ({
        url: `/infos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["single-info"],
    }),
  }),
});

export const {
  useLazyGetAllInfosQuery,
  useGetSingleInfoQuery,
  usePostInfoMutation,
  useUpdateInfoMutation,
  useDeleteInfoMutation,
} = extendedApiSlice;
