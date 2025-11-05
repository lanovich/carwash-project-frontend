import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";
import { setAccessToken, logout } from "@/features/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  Parameters<typeof baseQuery>[0],
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  const skipRefresh =
    url?.includes("/admin/login") || url?.includes("/admin/refresh");

  let result = await baseQuery(args, api, extraOptions);

  if (!skipRefresh && result.error && (result.error as any).status === 401) {
    const refreshResult = await baseQuery(
      { url: "/admin/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(
        setAccessToken(
          (refreshResult.data as { accessToken: string }).accessToken
        )
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
