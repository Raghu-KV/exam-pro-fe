import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://exam-pro-be.vercel.app",
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refershResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refershResult?.data?.accessToken) {
      localStorage.setItem("auth-token", refershResult?.data?.accessToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refershResult?.error?.status === 401) {
        refershResult.error.data.message = "Your login has expired. ";

        await baseQuery(
          {
            url: "/auth/logout",
            method: "POST",
          },
          api,
          extraOptions
        );
        localStorage.clear();
        window.location.href = "http://localhost:3000";
      }
      return refershResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:8080",
  // }),
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "exam-type",
    "exam-type-single",
    "students",
    "single-student",
    "subjetcts",
    "single-subject",
    "chapters",
    "single-chapter",
    "questions",
    "single-question",
    "tests",
    "single-test",
  ],
  endpoints: (builder) => ({}),
});

// export const { useGetTestApiQuery } = apiSlice;
