import { CARWASH_INFO } from "@/entities/carwash/model";
import { ROUTES } from "@/shared/lib";
import { LinkButton } from "@/shared/ui";
import { Phone } from "lucide-react";

export const HeaderButtons = () => {
  const phoneNumber = CARWASH_INFO.phone.replace(/\D/g, "");

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="hidden xs:flex 2xl:hidden gap-2 items-center">
        <a
          href={`tel:${phoneNumber}`}
          className="hidden md:block xl:hidden text-regular whitespace-nowrap hover:text-primary transition-colors"
        >
          {CARWASH_INFO.phone}
        </a>

        <LinkButton
          to={`tel:${phoneNumber}`}
          variant="ghost"
          iconOnly
          icon={<Phone size={20} color="var(--color-primary)" />}
        />
      </div>

      <LinkButton to={ROUTES.booking} className="h-[38px]">
        Записаться
      </LinkButton>
    </div>
  );
};
