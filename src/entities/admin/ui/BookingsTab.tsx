import { useState } from "react";
import { BookingAdminList } from "./BookingAdminList";
import { Tabs, TabOption } from "@/shared/ui";
import {
  type BookingStatus,
  useGetBookingCountsQuery,
} from "@/entities/booking/api";

type FilterType = BookingStatus | "all";

export const BookingsTab = () => {
  const [bookingFilter, setBookingFilter] = useState<FilterType>("pending");

  const { data: counts } = useGetBookingCountsQuery(undefined, {
    pollingInterval: 60000,
  });

  const BOOKING_FILTERS: TabOption<FilterType>[] = [
    { name: `Все (${counts?.all})`, value: "all" },
    { name: "Новые", value: "pending", badge: counts?.pending },
    { name: "Подтверждённые", value: "confirmed", badge: counts?.confirmed },
    { name: `Отменённые`, value: "canceled" },
    { name: `Завершённые (${counts?.completed})`, value: "completed" },
  ];

  const filterToPass: BookingStatus | "all" =
    bookingFilter === "all" ? "all" : (bookingFilter as BookingStatus);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center sm:text-left">Брони</h1>
      <Tabs
        tabs={BOOKING_FILTERS}
        selectedTab={bookingFilter}
        onChange={setBookingFilter}
      />
      <BookingAdminList filter={filterToPass} />
    </div>
  );
};
