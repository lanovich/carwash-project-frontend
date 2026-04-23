import { Calendar } from "lucide-react";
import { BookingAdminCard } from "./BookingAdminCard";
import { Loading } from "@/shared/ui";
import {
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
  type BookingStatus,
} from "@/entities/booking/api";
import { toast } from "sonner";

type FilterType = "all" | BookingStatus;

interface BookingAdminListProps {
  filter: FilterType;
}

export const BookingAdminList = ({ filter }: BookingAdminListProps) => {
  const apiFilter =
    filter === "all"
      ? undefined
      : { status: filter as Exclude<FilterType, "all"> };

  const { data, isLoading } = useGetBookingsQuery(apiFilter, {
    pollingInterval: 60000,
  });

  const bookings = data?.bookings ?? [];

  const [updateStatus] = useUpdateBookingStatusMutation();

  const handleConfirm = async (id: string) => {
    try {
      await updateStatus({ id, status: "confirmed" }).unwrap();
      toast.success("Бронирование подтверждено");
    } catch {
      toast.error("Не удалось подтвердить бронирование");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await updateStatus({ id, status: "canceled" }).unwrap();
      toast.success("Бронирование отклонено");
    } catch {
      toast.error("Не удалось отклонить бронирование");
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await updateStatus({ id, status: "completed" }).unwrap();
      toast.success("Бронь отмечены как завершённая", {
        style: { backgroundColor: "#dbeafe", color: "#1e40af" },
      });
    } catch {
      toast.error("Не удалось обновить статус");
    }
  };

  if (isLoading) return <Loading description="Получаем список заказов" />;

  if (!bookings.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
        <Calendar size={48} className="mb-4 opacity-50" />
        <p>Заказов пока нет</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {bookings.map((booking) => (
        <BookingAdminCard
          key={booking.id}
          booking={booking}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onComplete={handleComplete}
          isUpdating={false}
        />
      ))}
    </div>
  );
};
