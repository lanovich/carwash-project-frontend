import { CARWASH_INFO } from "@/entities/carwash/model";
import { ROUTES } from "@/shared/lib";
import { ContactItem, LinkButton } from "@/shared/ui";
import { Phone, MapPin, Clock } from "lucide-react";

export const Footer = () => {
  const { phone, address, workTime } = CARWASH_INFO;

  const contactItems = [
    {
      icon: <Phone size={16} color="var(--color-primary)" />,
      value: phone,
      href: `tel:${phone.replace(/\D/g, "")}`,
    },
    {
      icon: <MapPin size={16} color="var(--color-primary)" />,
      value: address.fullAddress,
      href: `https://yandex.ru/maps/?text=${encodeURIComponent(
        address.fullAddress
      )}`,
    },
    {
      icon: <Clock size={16} color="var(--color-primary)" />,
      value: `Ежедневно: ${workTime}`,
    },
  ];

  return (
    <footer className="bg-black text-text-subtle">
      <div className="max-w-[1660px] mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="logo.svg" alt="Автомойка" className="h-8 w-8" />
              <h2 className="text-caption font-bold text-white">Автомойка</h2>
            </div>
            <p className="text-caption  mb-4 sm:mb-6">
              Качественная мойка, химчистка и уход за автомобилем. Онлайн-запись
              экономит ваше время, приезжайте, когда удобно.
            </p>
          </div>

          <div>
            <h3 className="text-caption font-semibold mb-2 sm:mb-4 ">
              Подробнее
            </h3>
            <div className="flex flex-col gap-2">
              {contactItems.map(({ icon, value, href }, index) => (
                <ContactItem
                  key={index}
                  icon={icon}
                  href={href}
                  className="text-caption"
                >
                  {value}
                </ContactItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-caption font-semibold mb-2 sm:mb-4">
              Быстрая запись
            </h3>
            <p className="text-caption text-text-subtle mb-2 sm:mb-4">
              Запишитесь онлайн прямо сейчас и приезжайте без очереди
            </p>
            <LinkButton
              to={ROUTES.booking}
              size="xs"
              className="w-full sm:w-auto text-primary"
              variant="ghost"
            >
              Записаться онлайн
            </LinkButton>
          </div>
        </div>

        <div className="pt-4 border-t border-bg-light-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <p className="text-caption text-text-muted text-center sm:text-start">
              Автомойка в ст. Гостагаевская.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
