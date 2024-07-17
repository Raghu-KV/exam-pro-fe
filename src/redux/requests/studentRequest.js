import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (filterOptions) => {
        return filterOptions ? `/students${filterOptions}` : `/students`;
      },
    }),
  }),
});

export const { useLazyGetAllStudentsQuery } = extendedApiSlice;
