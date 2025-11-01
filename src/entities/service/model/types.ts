import { ObjectType } from "@/entities/booking/model";

export type MeasureLabel = "кв.м" | "деталь" | "шт";
export type DatabaseMeasure = "SQM" | "DETAIL" | "SHT";
export type Category = "salon" | "body" | "dryclean" | "special";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: Category;
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
  measure: MeasureLabel;
}

export interface ServiceResponse extends Omit<Service, "measure"> {
  measure: DatabaseMeasure;
}
