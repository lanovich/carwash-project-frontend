import { BookingRow } from "@/entities/booking/ui";
import { Button, InfoBlock } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDate,
  selectSelectedServices,
  selectSummary,
  selectTime,
  selectObjectType,
  resetBooking,
} from "../model";
import { CARWASH_INFO } from "@/entities/carwash/model";
import { AlertCircle } from "lucide-react";
import { useCreateBookingMutation } from "@/entities/booking/api";
import type { BookingRequest, BookingResponse } from "@/entities/booking/model";
import { BookingModal } from "@/features/booking-modal/ui";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  ContactFormSchema,
  DEFAULT_CONTACT_FORM_VALUES,
} from "@/entities/user/model";
import { formatDate } from "@/shared/lib/formatDate";

export const BookingSummary = () => {
  const dispatch = useDispatch();
  const { reset, handleSubmit } = useFormContext<ContactFormSchema>();
  const services = useSelector(selectSelectedServices);
  const { totalPrice, totalDuration } = useSelector(selectSummary);
  const date = useSelector(selectDate);
  const time = useSelector(selectTime);
  const objectType = useSelector(selectObjectType);

  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingResponse | undefined>(
    undefined
  );

  const canConfirm = !!date && !!time && services.length > 0 && !!objectType;

  const handleConfirm = handleSubmit(async ({ carType, ...user }) => {
    if (!canConfirm) return;

    const payload: BookingRequest = {
      user,
      objectType,
      serviceIds: services.map((s) => s.id),
      date,
      time,
    };

    try {
      const response = await createBooking(payload).unwrap();
      setBookingData(response);
      setModalOpen(true);
      dispatch(resetBooking());
      reset(DEFAULT_CONTACT_FORM_VALUES);
    } catch (err: any) {
      alert(err?.data?.message || "Ошибка при создании бронирования");
    }
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <InfoBlock heading="Адрес">
        <BookingRow size="md" value={CARWASH_INFO.address.fullAddress} />
      </InfoBlock>

      <InfoBlock heading="Дата и время">
        <BookingRow name="Дата" value={date ? formatDate(date).toDMY() : ""} />
        <BookingRow name="Время" value={time || ""} />
      </InfoBlock>

      <InfoBlock heading="Услуги">
        {services.map((service) => (
          <BookingRow
            key={service.id}
            name={service.title}
            value={`${service.price} ₽ ${
              service.duration ? `| ${service.duration} мин` : ""
            }`}
          />
        ))}
      </InfoBlock>

      <InfoBlock heading="Итого">
        <BookingRow size="lg" name="≈Время" value={`${totalDuration} мин`} />
        <BookingRow size="lg" name="Цена" value={`${totalPrice} ₽`} />
      </InfoBlock>

      <Button
        type="submit"
        className="text-white"
        onClick={handleConfirm}
        disabled={isLoading || !canConfirm}
      >
        {isLoading ? "Сохраняем..." : "Подтвердить и записаться"}
      </Button>

      <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-yellow-700">
            Внимание
          </span>
        </div>
        <ul className="text-xs text-yellow-800 space-y-2 leading-snug">
          <li>
            Цены примерные - зависят от объёма, типа авто и степени загрязнения
            <span className="text-red-500">
              {" "}
              (уточняет администратор на месте)
            </span>
            .
          </li>

          <li>
            Оператор позвонит для подтверждения (с 8:00 до 20:00) - без
            подтверждения запись может не состояться.
          </li>
        </ul>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        booking={bookingData}
      />
    </div>
  );
};
