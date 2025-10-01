import { Button } from "@/shared/ui";
import { FaWhatsapp, FaTelegramPlane, FaVk } from "react-icons/fa";

export const SocialButtons = () => {
  return (
    <div className="flex gap-1">
      {/* WhatsApp */}
      <Button iconOnly variant={"ghost"} className="border-none p-0">
        <a
          href="https://wa.me/79181525041"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <FaWhatsapp size={16} color="#25D366" />
        </a>
      </Button>

      {/* Telegram */}
      <Button iconOnly variant={"ghost"} className="border-none p-0">
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2"
        >
          <FaTelegramPlane size={16} color="#0088CC" />
        </a>
      </Button>

      {/* VK */}
      <Button iconOnly variant={"ghost"} className="border-none p-0">
        <a
          href="https://vk.com/yourprofile"
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
