import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/groups${filterOptions}` : `/groups`;
      },
      providesTags: ["groups"],
    }),

    getAllGroupsForDropDown: builder.query({
      query: () => `/groups/all`,
    }),

    getSingleGroupView: builder.query({
      query: (values) => {
        return values.search
          ? `/groups/view/${values.id}${values.search}`
          : `/groups/view/${values.id}`;
      },
    }),

    getGroupById: builder.query({
      query: (id) => `/groups/${id}`,
      providesTags: ["single-group"],
    }),

    addGroup: builder.mutation({
      query: ({ values }) => ({
        url: `/groups`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["groups"],
    }),

    editGroup: builder.mutation({
      query: ({ id, values }) => ({
        url: `/groups/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["groups", "single-group"],
    }),

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["groups", "single-group"],
    }),
  }),
});

export const {
  useLazyGetAllGroupsQuery,
  useLazyGetAllGroupsForDropDownQuery,
  useLazyGetSingleGroupViewQuery,
  useGetGroupByIdQuery,
  useAddGroupMutation,
  useEditGroupMutation,
  useDeleteGroupMutation,
} = extendedApiSlice;
