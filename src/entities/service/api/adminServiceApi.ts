import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, SERVICES_TAG } from "@/shared/api";
import { Service } from "../model";
import { ObjectType } from "@/entities/booking/model";
import { upsertObjectType, deleteObjectType } from "./adminServiceUtils";

export const adminServiceApi = createApi({
  reducerPath: "adminServiceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [SERVICES_TAG],

  endpoints: (builder) => ({
    adminGetAllServices: builder.query<Service[], void>({
      query: () => ({ url: "/services", method: "GET" }),
      providesTags: [{ type: SERVICES_TAG }],
    }),

    createService: builder.mutation<Service, Partial<Service>>({
      query: (data) => ({ url: "/services", method: "POST", body: data }),
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
          adminServiceApi.util.updateQueryData(
            "adminGetAllServices",
            undefined,
            (draft) => {
              const service = draft.find((s) => s.id === id);
              if (service) Object.assign(service, data);
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
      query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),

    upsertServiceObjectType: builder.mutation<
      { id?: number; objectType: string; price?: number; duration?: number },
      {
        serviceId: string;
        objectType: string;
        price?: number;
        duration?: number;
      }
    >({
      query: ({ serviceId, ...body }) => ({
        url: `/services/${serviceId}/object-types`,
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { serviceId, objectType, price, duration },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          adminServiceApi.util.updateQueryData(
            "adminGetAllServices",
            undefined,
            (draft) => {
              const service = draft.find((s) => s.id === serviceId);
              if (!service) return;
              upsertObjectType(
                service,
                objectType as ObjectType,
                price,
                duration
              );
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

    deleteServiceObjectType: builder.mutation<
      void,
      { serviceId: string; objectType: ObjectType }
    >({
      query: ({ serviceId, objectType }) => ({
        url: `/services/${serviceId}/object-types/${objectType}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { serviceId, objectType },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          adminServiceApi.util.updateQueryData(
            "adminGetAllServices",
            undefined,
            (draft) => {
              const service = draft.find((s) => s.id === serviceId);
              if (!service) return;
              deleteObjectType(service, objectType);
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
    uploadMainImage: builder.mutation<
      { mainImage: string },
      { serviceId: string; file: File }
    >({
      query: ({ serviceId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/services/${serviceId}/main-image`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),

    uploadAdditionalImage: builder.mutation<
      { additionalImages: string[] },
      { serviceId: string; file: File }
    >({
      query: ({ serviceId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/services/${serviceId}/additional-images`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),

    deleteAdditionalImage: builder.mutation<
      { additionalImages: string[] },
      { serviceId: string; imageUrl: string }
    >({
      query: ({ serviceId, imageUrl }) => ({
        url: `/services/${serviceId}/additional-images/${encodeURIComponent(
          imageUrl
        )}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: SERVICES_TAG }],
    }),
  }),
});

export const {
  useAdminGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpsertServiceObjectTypeMutation,
  useDeleteServiceObjectTypeMutation,
  useUploadMainImageMutation,
  useUploadAdditionalImageMutation,
  useDeleteAdditionalImageMutation,
} = adminServiceApi;
