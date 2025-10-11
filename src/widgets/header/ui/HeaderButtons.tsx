import { CARWASH_INFO } from "@/entities/carwash/model";
import { Button } from "@/shared/ui";
import { Menu, Phone, User } from "lucide-react";

export const HeaderButtons = () => (
  <div className="flex items-center gap-2 sm:gap-3">
    <div className="flex 2xl:hidden gap-2 items-center">
      <div className="hidden sm:block md:hidden 2xl:hidden text-regular">
        {CARWASH_INFO.phone}
      </div>
      <Button
        variant="ghost"
        iconOnly
        icon={<Phone size={20} color="var(--color-primary)" />}
      />
    </div>

    <div className="hidden md:flex items-center gap-2">
      <Button>Записаться</Button>
      <Button
        className="hidden md:flex"
        variant="secondary"
        iconOnly
        icon={<User size={20} />}
      />
    </div>

    <Button className="md:hidden" iconOnly icon={<Menu size={20} />} />
  </div>
);
