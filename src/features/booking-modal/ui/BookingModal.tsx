import { Modal, Button } from "@/shared/ui";
import { BookingResponse } from "@/entities/booking/model";
import { ROUTES } from "@/shared/lib";
import { CARWASH_INFO } from "@/entities/carwash/model";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: BookingResponse;
}

export const BookingModal = ({
  isOpen,
  onClose,
  booking,
}: BookingModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Ваш заказ принят!</h2>
        <p>Ожидайте звонка, оператор перезвонит для подтверждения заказа.</p>
        <p>Без подтверждения запись не состоится.</p>

        {booking && (
          <div className="bg-gray-100 p-2 rounded">
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(booking.date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Время:</strong> {booking.time}
            </p>
            <p>
              <strong>Адрес:</strong> {CARWASH_INFO.address.fullAddress}
            </p>
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} variant="ghost">
            Закрыть
          </Button>
          <Button onClick={() => (window.location.href = ROUTES.home)}>
            На главную
          </Button>
        </div>
      </div>
    </Modal>
  );
};
