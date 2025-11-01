import { CARWASH_INFO } from "@/entities/carwash/model";
import { Button } from "@/shared/ui";
import { FaWhatsapp, FaVk } from "react-icons/fa";

export const SocialButtons = () => {
  return (
    <div className="flex gap-1">
      <Button iconOnly variant={"ghost"} className="border-none p-0">
        <a
          href={CARWASH_INFO.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <FaWhatsapp size={16} color="#25D366" />
        </a>
      </Button>

      <Button iconOnly variant={"ghost"} className="border-none p-0">
        <a
          href={CARWASH_INFO.socials.vk}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <FaVk size={16} color="#4680C2" />
        </a>
      </Button>
    </div>
  );
};
