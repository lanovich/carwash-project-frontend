import { createApi } from "@reduxjs/toolkit/query/react";
import { BookingRequest, BookingResponse, BookingListResponse, BookingCounts } from "@/entities/booking/model";
import { baseQueryWithReauth } from "@/shared/api";

export type BookingStatus = "pending" | "confirmed" | "canceled" | "completed";

export interface GetBookingsFilters {
  status?: BookingStatus;
  date?: string;
  userId?: string;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
    getBookingCounts: builder.query<BookingCounts, void>({
      query: () => ({
        url: "/admin/booking/counts",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getBookings: builder.query<BookingListResponse, GetBookingsFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.status) params.set("status", filters.status);
        if (filters?.date) params.set("date", filters.date);
        if (filters?.userId) params.set("userId", filters.userId);
        const queryString = params.toString();
        return {
          url: `/admin/booking${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Bookings"],
    }),
    updateBookingStatus: builder.mutation<
      BookingResponse,
      { id: string; status: BookingStatus }
    >({
      query: ({ id, status }) => ({
        url: `/admin/booking/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingCountsQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;