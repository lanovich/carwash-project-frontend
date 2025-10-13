import { BookingRow } from "@/entities/booking/ui";
import { Button, InfoBlock } from "@/shared/ui";
import { useSelector } from "react-redux";
import {
  selectDate,
  selectSelectedServices,
  selectSummary,
  selectTime,
} from "../model";
import { CARWASH_INFO } from "@/entities/carwash/model";
import { AlertCircle } from "lucide-react";

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
      <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-yellow-700">
            Внимание
          </span>
        </div>
        <ul className="list-none text-xs text-yellow-800 ml-1 flex flex-col gap-1">
          <li>
            • Указанные цены соответствуют прайсу, но при сильном загрязнении и
            большом объёме работ окончательную стоимость озвучивает
            администратор
          </li>
          <li>
            • Услуги, указанные за шт. или кв.м, на месте могут быть пересчитаны
          </li>
          <li>
            • Оператор должен дозвониться до вас для подтверждения заказа, иначе
            запись не состоится
          </li>
        </ul>
      </div>
    </div>
  );
};
