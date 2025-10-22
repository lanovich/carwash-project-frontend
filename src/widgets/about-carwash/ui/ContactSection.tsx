import { CARWASH_INFO } from "@/entities/carwash/model";
import { ROUTES } from "@/shared/lib";
import { LinkButton } from "@/shared/ui";
import { ContactItem } from "@/shared/ui";
import { Article } from "@/widgets/section-block/ui";
import { Phone, MapPin, Clock } from "lucide-react";
import { FaVk, FaWhatsapp } from "react-icons/fa";

interface ContactData {
  icon: React.ReactNode;
  value?: string;
  href?: string;
}
export const ContactSection = () => {
  const { phone, socials, address, workTime } = CARWASH_INFO;

  const contactItems: ContactData[] = [
    {
      icon: <Phone size={18} color="var(--color-primary)" />,
      value: phone,
      href: `tel:${phone.replace(/\D/g, "")}`,
    },
    // {
    //   icon: <FaTelegramPlane size={18} color="var(--color-primary)" />,
    //   value: socials.telegram,
    //   href: `https://t.me/${socials.telegram}`,
    // },
    {
      icon: <FaVk size={18} color="var(--color-primary)" />,
      value: socials.vk,
      href: socials.vk,
    },
    {
      icon: <FaWhatsapp size={18} color="var(--color-primary)" />,
      value: socials.whatsapp,
      href: `https://wa.me/${socials.whatsapp}`,
    },
    {
      icon: <MapPin size={18} color="var(--color-primary)" />,
      value: address.fullAddress,
      href: `https://yandex.ru/maps/?text=${encodeURIComponent(
        address.fullAddress
      )}`,
    },
    {
      icon: <Clock size={18} color="var(--color-primary)" />,
      value: `Ежедневно: ${workTime} БЕЗ ВЫХОДНЫХ`,
    },
  ];

  return (
    <Article className="rounded-md flex flex-col gap-4 p-4 border border-primary">
      <h1 className="text-h1 mb-2">Контакты для записи</h1>

      <div className="flex flex-col gap-2 text-regular">
        {contactItems.map(({ icon, value, href }, index) => (
          <ContactItem key={index} icon={icon} href={href}>
            {value}
          </ContactItem>
        ))}
      </div>

      <LinkButton to={ROUTES.booking} className="mt-4 w-full">
        Перейти к бронированию
      </LinkButton>
    </Article>
  );
};
