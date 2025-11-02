import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, SERVICES_TAG } from "@/shared/api";
import { measureMap, Service, ServiceResponse } from "../model";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [SERVICES_TAG],
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => ({ url: "/services", method: "GET" }),
      transformResponse: (response: ServiceResponse[]): Service[] =>
        response.map((item) => ({
          ...item,
          measure: measureMap[item.measure],
        })),
      providesTags: [{ type: SERVICES_TAG }],
    }),

    createService: builder.mutation<Service, Partial<Service>>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),

    updateService: builder.mutation<
      Service,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          serviceApi.util.updateQueryData(
            "getAllServices",
            undefined,
            (draft) => {
              const index = draft.findIndex((s) => s.id === id);
              if (index !== -1) {
                Object.assign(draft[index], data);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteService: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
