import { createApi } from "@reduxjs/toolkit/query/react";
import { BookingRequest, BookingResponse } from "@/entities/booking/model";
import { baseQuery } from "@/shared/api";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
