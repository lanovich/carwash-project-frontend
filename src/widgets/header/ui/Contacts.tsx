import { CARWASH_INFO } from "@/entities/carwash/model";
import { SocialButtons } from "@/features/social-buttons/ui";
import { LinkButton } from "@/shared/ui";
import { Phone } from "lucide-react";

export const Contacts = () => {
  const phoneNumber = CARWASH_INFO.phone.replace(/\D/g, "");

  return (
    <div className="hidden xl:flex items-center gap-3 text-sm sm:text-base">
      <a
        href={`tel:${phoneNumber}`}
        className="text-regular hover:text-primary transition-colors"
      >
        {CARWASH_INFO.phone}
      </a>

      <LinkButton
        to={`tel:${phoneNumber}`}
        variant="ghost"
        iconOnly
        icon={<Phone size={20} color="var(--color-primary)" />}
        className="xl:hidden"
      />

      <SocialButtons />
    </div>
  );
};
