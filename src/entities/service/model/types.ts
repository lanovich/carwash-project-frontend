import { ObjectType } from "@/entities/booking/model";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: "salon" | "body" | "dryclean" | "special";
  popular?: boolean;
  resultDescriptions?: string[];
  tags?: string[];

  prices: Partial<Record<ObjectType, number>>;
  duration: Partial<Record<ObjectType, number>>;

  objectTypes: ObjectType[];
  mainImage?: string;
  additionalImages?: string[];

  childIds?: string[];
  parentServiceId?: string;

  from?: boolean;
  measure?: "шт" | "кв.м" | "деталь";
}
