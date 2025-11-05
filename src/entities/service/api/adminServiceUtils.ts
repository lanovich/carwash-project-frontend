import { ObjectType } from "@/entities/booking/model";
import { Service } from "../model";

export function normalizeObjectTypes(service: Service) {
  return service.objectTypes.map((ot) => ({
    objectType: ot,
    price: service.prices?.[ot],
    duration: service.duration?.[ot],
  }));
}

export function upsertObjectType(
  service: Service,
  objectType: ObjectType,
  price?: number,
  duration?: number
) {
  if (!service.prices) service.prices = {};
  if (!service.duration) service.duration = {};

  if (price !== undefined) service.prices[objectType] = price;
  if (duration !== undefined) service.duration[objectType] = duration;

  if (!service.objectTypes.includes(objectType)) {
    service.objectTypes.push(objectType);
  }

  return service;
}

export function deleteObjectType(service: Service, objectType: ObjectType) {
  if (service.prices) delete service.prices[objectType];
  if (service.duration) delete service.duration[objectType];
  service.objectTypes = service.objectTypes.filter((ot) => ot !== objectType);
  if (service.objectTypes.includes(objectType))
    service.objectTypes = service.objectTypes.filter((ot) => ot !== objectType);

  return service;
}
