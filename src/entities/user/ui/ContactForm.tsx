import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";
import { Phone, User, Mail, Car, Palette, BadgeInfo, Hash } from "lucide-react";

export const ContactForm = () => {
  return (
    <div className={cn("flex gap-3 flex-col sm:flex-row xl:flex-col 2xl:flex-row")}>
      <div className="flex flex-col gap-2 flex-1">
        <h3>Контактные данные</h3>
        <div className="flex flex-col gap-2">
          <Input
            withLeftArea
            icon={<Phone size={20} />}
            placeholder="+7 (999) 999-99-99"
          />
          <Input
            withLeftArea
            icon={<User size={20} />}
            placeholder="Имя"
          />
          <Input
            withLeftArea
            icon={<Mail size={20} />}
            variant={'secondary'}
            placeholder="Почта (опционально)"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3>Ваш автомобиль</h3>
        <div className="flex flex-col gap-2">
          <Input
            withLeftArea
            icon={<Car size={20} />}
            placeholder="Тип автомобиля"
            value={"КРОССОВЕР"}
            readOnly
          />
          <Input
            withLeftArea
            icon={<Palette size={20} />}
            placeholder="Цвет автомобиля"
          />
          <Input
            withLeftArea
            icon={<BadgeInfo size={20} />}
            placeholder="Модель / марка"
          />
          <Input
            withLeftArea
            icon={<Hash size={20} />}
            variant={'secondary'}
            placeholder="Гос. номер (опционально)"
          />
        </div>
      </div>
    </div>
  );
};
