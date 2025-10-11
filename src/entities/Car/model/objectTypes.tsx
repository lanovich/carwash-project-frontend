import { ObjectType } from "@/entities/booking/model";
import { Blocks, Bus, Car, CarFront } from "lucide-react";

export const OBJECT_TYPES: Record<
  ObjectType,
  { caption: string; icon: React.ReactNode }
> = {
  sedan: {
    caption: "Легковой / Мотоцикл",
    icon: <Car size={40} strokeWidth={1} />,
  },
  crossover: {
    caption: "Кроссовер",
    icon: <CarFront size={40} strokeWidth={1} />,
  },
  minivan: {
    caption: "Минивен",
    icon: <Bus size={40} strokeWidth={1} />,
  },
  special: {
    caption: "Другое",
    icon: <Blocks size={40} strokeWidth={1} />,
  },
};
