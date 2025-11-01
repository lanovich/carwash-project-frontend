import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Service } from "@/entities/service/model";
import { ServiceRequest } from "@/entities/admin/model";
import { SERVICES_TAG } from "@/shared/api";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  tagTypes: [SERVICES_TAG],
  endpoints: (builder) => ({
    createService: builder.mutation<Service, ServiceRequest>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [SERVICES_TAG],
    }),

    updateService: builder.mutation<
      Service,
      { id: string; data: Partial<ServiceRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: SERVICES_TAG, id }],
    }),

    deleteService: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [SERVICES_TAG],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = adminApi;
