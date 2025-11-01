import { cn } from "@/shared/lib";
import { Phone, User, Mail, Car, Palette, BadgeInfo, Hash } from "lucide-react";
import { FormField, Input } from "@/shared/ui";
import { objectTypesMap } from "@/entities/car/model";
import { useFormContext } from "react-hook-form";
import { ContactFormSchema } from "../model";
import { useSelector } from "react-redux";
import { selectObjectType } from "@/entities/booking/model";

export const ContactForm = () => {
  const { control } = useFormContext<ContactFormSchema>();
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
          <FormField name="phone" control={control} type="tel">
            <Input
              placeholder="+7 (999) 999-99-99"
              className="w-full"
              withLeftArea
              areaContent={<Phone size={20} />}
            />
          </FormField>

          <FormField name="name" control={control}>
            <Input
              placeholder="Имя"
              className="w-full"
              withLeftArea
              areaContent={<User size={20} />}
            />
          </FormField>

          <FormField name="email" control={control} type="email">
            <Input
              placeholder="Почта (опционально)"
              className="w-full"
              withLeftArea
              areaContent={<Mail size={20} />}
            />
          </FormField>
        </div>
      </div>

      {objectType !== "special" && (
        <div className="flex flex-col gap-2 flex-1">
          <h3>Ваш автомобиль</h3>
          <div className="flex flex-col gap-2">
            <FormField name="carType" control={control}>
              <Input
                placeholder="Тип автомобиля"
                readOnly
                value={
                  objectType
                    ? objectTypesMap[objectType].caption.toUpperCase()
                    : ""
                }
                className="w-full"
                withLeftArea
                areaContent={<Car size={20} />}
              />
            </FormField>

            <FormField name="carColor" control={control}>
              <Input
                placeholder="Цвет автомобиля"
                className="w-full"
                withLeftArea
                areaContent={<Palette size={20} />}
              />
            </FormField>

            <FormField name="carModel" control={control}>
              <Input
                placeholder="Модель / марка"
                className="w-full"
                withLeftArea
                areaContent={<BadgeInfo size={20} />}
              />
            </FormField>

            <FormField name="licensePlate" control={control}>
              <Input
                placeholder="Гос. номер (опционально)"
                className="w-full"
                withLeftArea
                areaContent={<Hash size={20} />}
              />
            </FormField>
          </div>
        </div>
      )}
    </form>
  );
};
