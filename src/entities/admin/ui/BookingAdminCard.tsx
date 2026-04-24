import { useState } from "react";
import {
  ChevronDown,
  Check,
  X,
  Clock,
  Wrench,
  Copy,
  Car,
  Palette,
  Hash,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { BookingResponse } from "@/entities/booking/model";
import { formatDate, formatPhone, formatId } from "@/shared/lib";
import { objectTypesMap } from "@/entities/car/model";
import { toast } from "sonner";

interface Props {
  booking: BookingResponse;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete?: (id: string) => void;
  isUpdating: boolean;
}

export const BookingAdminCard = ({
  booking,
  onConfirm,
  onCancel,
  onComplete,
  isUpdating,
}: Props) => {
  const [open, setOpen] = useState(false);

  const statusConfig = {
    pending: {
      label: "Новый",
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock size={14} />,
    },
    confirmed: {
      label: "Подтверждён",
      className: "bg-green-100 text-green-800",
      icon: <Check size={14} />,
    },
    canceled: {
      label: "Отклонён",
      className: "bg-red-100 text-red-800",
      icon: <X size={14} />,
    },
    completed: {
      label: "Завершён",
      className: "bg-blue-100 text-blue-800",
      icon: <Check size={14} />,
    },
  };

  const status = statusConfig[booking.status];

  const items = booking.items ?? [];
  const totalPrice = items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const totalDuration = items.reduce(
    (sum, item) => sum + (item.duration ?? 0),
    0,
  );

  const hasContactInfo = booking.user?.phone || booking.user?.email;
  const hasCarInfo =
    booking.car?.carModel || booking.car?.carColor || booking.car?.licensePlate;

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Номер скопирован");
  };

  return (
    <div
      className={`border border-primary rounded-md transition-all duration-200 overflow-hidden hover:shadow-lg ${
        open ? "shadow-md bg-primary-light-hover/50" : "bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-2 px-3 py-2"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col justify-between gap-1 text-left min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-black truncate">
                {booking.user?.name || "Без имени"}
              </p>
              {booking.user?.phone && (
                <a
                  href={`tel:${booking.user.phone}`}
                  className="text-xs text-primary hover:underline shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {formatPhone(booking.user.phone)}
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div
                className={`px-2 py-0.5 rounded-sm flex items-center gap-1 text-[12px] ${status.className}`}
              >
                {status.icon}
                <span>{status.label}</span>
              </div>

              <span className="text-[12px] text-text-secondary">
                {formatDate(booking.date).toDMY()} | {booking.time}
              </span>
            </div>
            <div className="flex gap-2 mt-1">
              <span className="text-xs text-text-secondary">
                {objectTypesMap[booking.objectType].caption.split(" / ")[0]}
              </span>
              <span className="text-xs text-text-secondary">
                {booking.car?.carColor}
              </span>

              {booking.car?.licensePlate && (
                <span className="flex items-center gap-1 text-[12px] text-text-secondary">
                  <Car size={12} />
                  {booking.car.licensePlate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          className="text-primary flex-shrink-0 transition-transform duration-300"
          style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      {open && (
        <div className="bg-primary-light-hover/50 px-3 py-3 border-t border-primary rounded-b-md animate-modal-open">
          <div className="flex flex-col gap-4">
            {hasContactInfo && (
              <div>
                <p className="text-xs text-text-subtle mb-2">Контакт</p>
                <div className="flex flex-col gap-1">
                  {booking.user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-text-secondary" />
                      <a
                        href={`tel:${booking.user.phone}`}
                        className="text-sm text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {formatPhone(booking.user.phone)}
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPhone(booking.user!.phone!);
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Копировать номер"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  )}
                  {booking.user?.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-text-secondary" />
                      <a
                        href={`mailto:${booking.user.email}`}
                        className="text-sm text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {booking.user.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasCarInfo && (
              <div>
                <p className="text-xs text-text-subtle mb-2">Автомобиль</p>
                <div className="flex flex-col gap-1">
                  {booking.car?.carModel && (
                    <div className="flex items-center gap-2">
                      <Car size={14} className="text-text-secondary" />
                      <span className="text-sm">{booking.car.carModel}</span>
                    </div>
                  )}
                  {booking.car?.carColor && (
                    <div className="flex items-center gap-2">
                      <Palette size={14} className="text-text-secondary" />
                      <span className="text-sm">{booking.car.carColor}</span>
                    </div>
                  )}
                  {booking.car?.licensePlate && (
                    <div className="flex items-center gap-2">
                      <Hash size={14} className="text-text-secondary" />
                      <span className="text-sm font-medium">
                        {booking.car.licensePlate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {items.length > 0 && (
              <div>
                <p className="text-xs text-text-subtle mb-2">Услуги</p>
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex max-w-[500px] items-center justify-between bg-white px-3 py-2 rounded border border-gray-300 text-sm"
                    >
                      <span className="flex-1 truncate">
                        {item.service?.title}
                      </span>
                      <span className="text-text-secondary text-xs ml-2 shrink-0">
                        {item.price ?? 0} ₽
                      </span>
                      <span className="text-text-secondary text-xs w-14 text-right shrink-0">
                        {item.duration ?? 0} мин
                      </span>
                    </div>
                  ))}
                  <div className="flex max-w-[500px] items-center justify-between bg-white px-3 py-2 rounded border border-primary font-medium text-sm">
                    <span className="flex-1">ИТОГО:</span>
                    <span className="text-sm mr-2 shrink-0">
                      {totalPrice} ₽
                    </span>
                    <span className="text-text-secondary text-xs w-14 text-right shrink-0">
                      {totalDuration} мин
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-text-subtle">
              <p>ID: {formatId(booking.id)}</p>
              <p>
                Обновлено:{" "}
                {new Date(booking.updatedAt).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}{" "}
                {new Date(booking.updatedAt).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {booking.status === "pending" && (
              <div className="flex gap-2 pt-2 border-t border-primary">
                <Button
                  className="flex-1"
                  size="sm"
                  icon={<Check size={16} />}
                  iconPosition="left"
                  variant="primary"
                  onClick={() => onConfirm(booking.id)}
                  disabled={isUpdating}
                >
                  Подтвердить
                </Button>
                <Button
                  size="sm"
                  icon={<X size={16} />}
                  iconPosition="left"
                  variant="ghost"
                  onClick={() => onCancel(booking.id)}
                  disabled={isUpdating}
                >
                  Отклонить
                </Button>
              </div>
            )}

            {booking.status === "confirmed" && onComplete && (
              <div className="flex gap-2 pt-2 border-t border-primary">
                <Button
                  className="w-full"
                  size="sm"
                  icon={<Wrench size={16} />}
                  iconPosition="left"
                  variant="primary"
                  onClick={() => onComplete(booking.id)}
                  disabled={isUpdating}
                >
                  Услуги оказаны
                </Button>
                <Button
                  size="sm"
                  icon={<X size={16} />}
                  iconPosition="left"
                  variant="ghost"
                  onClick={() => onCancel(booking.id)}
                  disabled={isUpdating}
                >
                  Отклонить
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
