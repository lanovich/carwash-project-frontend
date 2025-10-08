import { cn } from "@/shared/lib";
import { Phone, User, Mail, Car, Palette, BadgeInfo, Hash } from "lucide-react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FormField } from "@/shared/ui";
import {
  selectObjectType,
  selectUser,
  updateUser,
} from "@/entities/booking/model";
import React from "react";

export const ContactForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser, shallowEqual);
  const objectType = useSelector(selectObjectType);

  const handleChange = React.useCallback(
    (key: keyof typeof user, value: string) => {
      dispatch(updateUser({ [key]: value }));
    },
    [dispatch]
  );

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
            icon={<Phone size={20} />}
            placeholder="+7 (999) 999-99-99"
            value={user.phone}
            onChange={(val) => handleChange("phone", val)}
          />
          <FormField
            icon={<User size={20} />}
            placeholder="Имя"
            value={user.name}
            onChange={(val) => handleChange("name", val)}
          />
          <FormField
            icon={<Mail size={20} />}
            placeholder="Почта (опционально)"
            variant="secondary"
            value={user.email}
            onChange={(val) => handleChange("email", val)}
          />
        </div>
      </div>

      {objectType !== "special" && (
        <div className="flex flex-col gap-2 flex-1">
          <h3>Ваш автомобиль</h3>
          <div className="flex flex-col gap-2">
            <FormField
              icon={<Car size={20} />}
              placeholder="Тип автомобиля"
              readOnly
              value={objectType ?? ""}
            />
            <FormField
              icon={<Palette size={20} />}
              placeholder="Цвет автомобиля"
              value={user.carColor}
              onChange={(val) => handleChange("carColor", val)}
            />
            <FormField
              icon={<BadgeInfo size={20} />}
              placeholder="Модель / марка"
              value={user.carModel}
              onChange={(val) => handleChange("carModel", val)}
            />
            <FormField
              icon={<Hash size={20} />}
              placeholder="Гос. номер (опционально)"
              variant="secondary"
              value={user.licensePlate}
              onChange={(val) => handleChange("licensePlate", val)}
            />
          </div>
        </div>
      )}
    </form>
  );
};
