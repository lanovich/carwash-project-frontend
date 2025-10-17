import { cn } from "@/shared/lib";
import { Phone, User, Mail, Car, Palette, BadgeInfo, Hash } from "lucide-react";
import { useSelector } from "react-redux";
import { FormField } from "@/shared/ui";
import { selectObjectType } from "@/entities/booking/model";
import { OBJECT_TYPES } from "@/entities/car/model";

export const ContactForm = () => {
  const objectType = useSelector(selectObjectType);

  return (
    <form
      id="contact-form"
      name="contact-form"
      className={cn("flex gap-3 flex-col sm:flex-row xl:flex-col 2xl:flex-row")}
    >
      <div className="flex flex-col gap-2 flex-1">
        <h3>Контактные данные</h3>
        <div className="flex flex-col gap-2">
          <FormField
            name="phone"
            areaContent={<Phone size={20} />}
            placeholder="+7 (999) 999-99-99"
          />
          <FormField
            name="name"
            areaContent={<User size={20} />}
            placeholder="Имя"
          />
          <FormField
            name="email"
            areaContent={<Mail size={20} />}
            placeholder="Почта (опционально)"
            variant="secondary"
          />
        </div>
      </div>

      {objectType !== "special" && (
        <div className="flex flex-col gap-2 flex-1">
          <h3>Ваш автомобиль</h3>
          <div className="flex flex-col gap-2">
            <FormField
              areaContent={<Car size={20} />}
              placeholder="Тип автомобиля"
              readOnly
              value={
                objectType ? OBJECT_TYPES[objectType].caption.toUpperCase() : ""
              }
            />
            <FormField
              name="carColor"
              areaContent={<Palette size={20} />}
              placeholder="Цвет автомобиля"
            />
            <FormField
              name="carModel"
              areaContent={<BadgeInfo size={20} />}
              placeholder="Модель / марка"
            />
            <FormField
              name="licensePlate"
              areaContent={<Hash size={20} />}
              placeholder="Гос. номер (опционально)"
              variant="secondary"
            />
          </div>
        </div>
      )}
    </form>
  );
};
