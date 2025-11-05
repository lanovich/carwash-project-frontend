import { ObjectType } from "@/entities/booking/model";
import { Service, ServiceResponse, measureMap } from "@/entities/service/model";

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

  const readableMeasure =
    service.measure && measureMap[service.measure as ServiceResponse["measure"]]
      ? measureMap[service.measure as ServiceResponse["measure"]]
      : service.measure;

  if (service.from && readableMeasure) {
    return `от ${formattedPrice} ₽ | ${readableMeasure}`;
  }

  if (service.from) {
    return `от ${formattedPrice} ₽`;
  }

  if (readableMeasure) {
    return `${formattedPrice} ₽ | ${readableMeasure}`;
  }

  return `${formattedPrice} ₽`;
};
