import { BookingRow, InfoBlock } from "@/entities/booking/ui";
import { Button } from "@/shared/ui";
import { useSelector } from "react-redux";
import {
  selectDate,
  selectSelectedServices,
  selectSummary,
  selectTime,
} from "../model";
import { CARWASH_INFO } from "@/entities/carwash/model";

export const BookingSummary = () => {
  const services = useSelector(selectSelectedServices);
  const { totalPrice, totalDuration } = useSelector(selectSummary);
  const date = useSelector(selectDate);
  const time = useSelector(selectTime);

  console.log(services);

  return (
    <div className="flex flex-col gap-4 w-full">
      <InfoBlock heading="Адрес">
        <BookingRow size="md" value={CARWASH_INFO.address.fullAddress} />
      </InfoBlock>

      <InfoBlock heading="Дата и время">
        <BookingRow name="Дата" value={date || ""} />
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

      <Button className="text-white">Подтвердить и записаться</Button>
    </div>
  );
};
