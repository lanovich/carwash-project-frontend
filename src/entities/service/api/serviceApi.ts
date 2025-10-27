import { baseQuery } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { measureMap, Service, ServiceResponse } from "../model";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => ({ url: "/api/services", method: "GET" }),

      transformResponse: (response: ServiceResponse[]): Service[] => {
        return response.map((item) => ({
          ...item,
          measure: measureMap[item.measure],
        }));
      }
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
