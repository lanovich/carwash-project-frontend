import { CARWASH_INFO } from "@/entities/carwash/model";
import { SocialButtons } from "@/features/social-buttons/ui";
import { Button } from "@/shared/ui";
import { Phone } from "lucide-react";

export const Contacts = () => (
  <div className="hidden 2xl:flex items-center gap-3 text-sm sm:text-base">
    <div className="text-regular">{CARWASH_INFO.phone}</div>
    <Button
      variant="ghost"
      iconOnly
      icon={<Phone size={16} color="var(--color-primary)" />}
    />
    <SocialButtons />
  </div>
);
