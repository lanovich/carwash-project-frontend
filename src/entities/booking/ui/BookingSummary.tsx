import { BookingRow, InfoBlock } from "@/entities/booking/ui";
import { Button } from "@/shared/ui";
import { useSelector } from "react-redux";
import {
  selectDate,
  selectSelectedServices,
  selectSummary,
  selectTime,
} from "../model";
import { useMemo } from "react";

const bookingData = {
  address: {
    full: "Анапский район, станица Гостагаевская, ул Комсомольская 15а",
  },
};

export const BookingSummary = () => {
  const { address } = bookingData;
  const services = useSelector(selectSelectedServices);
  const { totalPrice, totalDuration } = useSelector(selectSummary);
  const date = useSelector(selectDate);
  const time = useSelector(selectTime);

  const iterableServices = useMemo(() => Object.entries(services), [services]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <InfoBlock heading="Адрес">
        <BookingRow value={address.full} />
      </InfoBlock>

      <InfoBlock heading="Дата и время">
        <BookingRow name="Дата" value={date || ""} />
        <BookingRow name="Время" value={time || ""} />
      </InfoBlock>

      <InfoBlock heading="Услуги">
        {iterableServices.map(([_, service], index) => (
          <BookingRow
            key={index}
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

      <Button className="text-white">Подтвердить и записаться</Button>
    </div>
  );
};
