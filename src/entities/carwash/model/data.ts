import { CarwashInfo } from "./types";

export const CARWASH_INFO: CarwashInfo = {
  name: "Автомойка",
  address: {
    fullAddress: "Анапский район, ст. Гостагаевская, ул. Комсомольская 46",
    region: "Анапский район",
    city: "ст. Гостагаевская",
    street: "ул. Комсомольская",
    house: "46",
  },
  workTime: "8:00 - 20:00",
  coordinates: [45.018494, 37.509739],
  url: "https://yandex.ru/maps/?rtext=~45.018494,37.509739&rtt=mt",
  phone: "+7 (123) 456-78-90",
  socials: {
    whatsapp: "https://wa.me/79181525041",
    telegram: "https://t.me/yourusername",
    vk: "https://vk.com/yourprofile",
  },
};
