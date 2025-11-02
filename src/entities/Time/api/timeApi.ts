import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/api";
import { TimeSlotsApiResponse } from "@/entities/time/model";

export const timeSlotsApi = createApi({
  reducerPath: "timeSlotsApi",
  baseQuery,
  endpoints: (builder) => ({
    getTimeSlots: builder.query<TimeSlotsApiResponse, string>({
      query: (date) => ({
        url: `/time-slots`,
        method: "GET",
        params: { date },
      }),
    }),
  }),
});

export const { useGetTimeSlotsQuery } = timeSlotsApi;
