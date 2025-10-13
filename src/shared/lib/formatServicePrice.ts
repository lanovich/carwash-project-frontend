import { ObjectType } from "@/entities/booking/model";
import { Service } from "@/entities/service/model";

export const formatServicePrice = (
  service: Service,
  selectedObjectType?: ObjectType
) => {
  if (!selectedObjectType) return "-";

  const price = service.prices[selectedObjectType];
  if (price == null) return "-";

  const formatNumber = (num?: number | string) => {
    if (typeof num === "number") {
      return new Intl.NumberFormat("ru-RU").format(num);
    }
    return num || "-";
  };

  const formattedPrice = formatNumber(price);

  if (service.from && service.measure) {
    return `от ${formattedPrice} ₽ | ${service.measure}`;
  }

  if (service.from) {
    return `от ${formattedPrice} ₽`;
  }

  if (service.measure) {
    return `${formattedPrice} ₽ | ${service.measure}`;
  }

  return `${formattedPrice} ₽`;
};
