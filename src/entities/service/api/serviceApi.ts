import { baseQuery } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Service } from "../model";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => ({ url: "/api/services", method: "GET" }),
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
