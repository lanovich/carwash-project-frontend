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

export interface Admin {
  id: string;
  login: string;
  email: string | null;
  role: string;
  isActive: boolean;
  notifyOnBooking: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminRequest {
  login: string;
  password: string;
  email?: string;
  notifyOnBooking?: boolean;
}

export interface UpdateAdminRequest {
  login?: string;
  email?: string;
  isActive?: boolean;
  notifyOnBooking?: boolean;
}

export interface UpdateMeRequest {
  login?: string;
  email?: string;
  password?: string;
  notifyOnBooking?: boolean;
}

export interface NotificationSettings {
  emailFrom: string | null;
  telegramId: string | null;
  isActive: boolean;
}

export interface UpdateNotificationSettingsRequest {
  emailFrom?: string | null;
  telegramId?: string | null;
  isActive?: boolean;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Services", "Admins"],
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
    getMe: builder.query<Admin, void>({
      query: () => ({ url: "/admin/me", method: "GET" }),
    }),
    updateMe: builder.mutation<Admin, UpdateMeRequest>({
      query: (body) => ({
        url: "/admin/me",
        method: "PATCH",
        body,
      }),
    }),
    getAllAdmins: builder.query<Admin[], void>({
      query: () => ({ url: "/admin/admins", method: "GET" }),
      providesTags: ["Admins"],
    }),
    createAdmin: builder.mutation<Admin, CreateAdminRequest>({
      query: (body) => ({
        url: "/admin/admins",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: builder.mutation<Admin, { id: string; data: UpdateAdminRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/admins/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation<Admin, string>({
      query: (id) => ({
        url: `/admin/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => ({ url: "/admin/settings", method: "GET" }),
    }),
    updateNotificationSettings: builder.mutation<NotificationSettings, UpdateNotificationSettingsRequest>({
      query: (body) => ({
        url: "/admin/settings",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = adminApi;