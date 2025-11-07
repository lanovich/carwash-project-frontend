import { ObjectType } from "@/entities/booking/model";
import { Service, ServiceResponse } from "@/entities/service/model";

export const CATEGORY_GROUPS: Record<
  ObjectType,
  { name: string; value: Service["category"] }[]
> = {
  sedan: [
    { name: "Салон", value: "salon" },
    { name: "Кузов", value: "body" },
    { name: "Химчистка", value: "dryclean" },
  ],
  crossover: [
    { name: "Салон", value: "salon" },
    { name: "Кузов", value: "body" },
    { name: "Химчистка", value: "dryclean" },
  ],
  jeep: [
    { name: "Салон", value: "salon" },
    { name: "Кузов", value: "body" },
    { name: "Химчистка", value: "dryclean" },
  ],
  minivan: [
    { name: "Салон", value: "salon" },
    { name: "Кузов", value: "body" },
    { name: "Химчистка", value: "dryclean" },
  ],
};

export const measureMap: Record<
  ServiceResponse["measure"],
  Service["measure"]
> = {
  SQM: "кв.м",
  DETAIL: "деталь",
  SHT: "шт",
};

export const ALL_CATEGORIES = [
  { name: "Салон", value: "salon" },
  { name: "Кузов", value: "body" },
  { name: "Химчистка", value: "dryclean" },
] as const;
