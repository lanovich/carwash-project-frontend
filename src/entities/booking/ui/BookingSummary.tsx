import { BookingRow, InfoBlock } from "@/entities/booking/ui";
import { Button } from "@/shared/ui";

const bookingData = {
  address: {
    full: "Анапский район, станица Гостагаевская, ул Комсомольская 15а",
  },
  date: {
    label: "22 сентября 2025",
    time: "9:00",
  },
  car: {
    type: "КРОССОВЕР",
    color: "белый",
    model: "Kia rio",
    number: "A205BG | 193",
  },
  contact: {
    phone: "+7 (918) 152 50 41",
    name: "Роман Николаевич",
    email: "romangege32@gmail.com",
  },
  services: [
    { title: "Отбивка (с пеной без протирки)", price: 600, duration: 30 },
    { title: "чистка багажника", price: 200, duration: 10 },
    { title: "чистка багажника", price: 200, duration: 10 },
    { title: "чистка багажника", price: 200, duration: 10 },
  ],
  total: {
    duration: 60,
    price: 1200,
  },
};

export const BookingSummary = () => {
  const { address, date, car, contact, services, total } = bookingData;

  return (
    <div className="flex flex-col gap-4 w-full">
      <InfoBlock heading="Адрес">
        <BookingRow value={address.full} />
      </InfoBlock>

      <InfoBlock heading="Дата и время">
        <BookingRow name="Дата" value={date.label} />
        <BookingRow name="Время" value={date.time} />
      </InfoBlock>
      {/* 
      <InfoBlock heading="Автомобиль">
        <BookingRow name="Тип" value={car.type} />
        <BookingRow name="Модель и цвет" value={`${car.model} (${car.color})`} />
        <BookingRow name="Номер" value={car.number} />
      </InfoBlock>

      <InfoBlock heading="Контактные данные">
        <BookingRow name="Имя" value={contact.name} />
        <BookingRow name="Телефон" value={contact.phone} />
        <BookingRow name="Email" value={contact.email} />
      </InfoBlock> */}

      <InfoBlock heading="Услуги">
        {services.map((service, index) => (
          <BookingRow
            key={index}
            name={service.title}
            value={`${service.price} ₽ | ${service.duration} мин`}
          />
        ))}
      </InfoBlock>

      <InfoBlock heading="Итого">
        <BookingRow size="lg" name="≈Время" value={`${total.duration} мин`} />
        <BookingRow
          size="lg"
          name="Цена"
          value={`${services.map((service) => service.price).join(" + ")} = ${
            total.price
          } ₽`}
        />
      </InfoBlock>

      <Button className="text-white">Подтвердить и записаться</Button>
    </div>
  );
};
