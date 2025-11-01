import { baseQuery, SERVICES_TAG } from "@/shared/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { measureMap, Service, ServiceResponse } from "../model";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,
  tagTypes: [SERVICES_TAG],
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => ({ url: "/api/services", method: "GET" }),

      transformResponse: (response: ServiceResponse[]): Service[] => {
        return response.map((item) => ({
          ...item,
          measure: measureMap[item.measure],
        }));
      },
      providesTags: [{ type: SERVICES_TAG }],
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
