export interface Service {
  id: string;
  title: string;
  short_description: string;
  long_description?: string;
  category: "salon" | "body" | "dryclean";
  duration_minutes?: number;
  popular?: boolean;
  result_descriptions?: string[];
  tags?: string[];
  prices: {
    sedan: number;
    crossover: number;
    minivan: number;
    carpet: number;
  };
  main_image?: string;
  additional_images?: string[];
}
