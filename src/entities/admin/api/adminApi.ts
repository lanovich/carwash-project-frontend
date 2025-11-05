import { createApi } from "@reduxjs/toolkit/query/react";
import { setAccessToken, logout } from "@/features/auth/authSlice";
import { baseQueryWithReauth } from "@/shared/api";

interface LoginRequest {
  login: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.accessToken));
        } catch {}
      },
    }),
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({ url: "/admin/refresh", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.accessToken));
        } catch {
          dispatch(logout());
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/admin/logout", method: "POST" }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  adminApi;
