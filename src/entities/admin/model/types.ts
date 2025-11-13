import { Category, DatabaseMeasure } from "@/entities/service/model";

export interface ServiceRequest {
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: Category;
  popular?: boolean;
  resultDescriptions: string[];
  tags: string[];
  mainImage?: string;
  order?: number;
  additionalImages?: string[];
  from?: boolean;
  measure?: DatabaseMeasure;
}
