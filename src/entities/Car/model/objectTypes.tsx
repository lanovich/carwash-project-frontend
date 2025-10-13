import { ObjectType } from "@/entities/booking/model";
import { MinivanIcon } from "@/shared/icons";
import { CrossoverIcon } from "@/shared/icons/CrossoverIcon";
import { SedanIcon } from "@/shared/icons/SedanIcon";
import { Blocks } from "lucide-react";

export const OBJECT_TYPES: Record<
  ObjectType,
  { caption: string; icon: React.ReactNode }
> = {
  sedan: {
    caption: "Легковой / Мотоцикл",
    icon: <SedanIcon size={62} />,
  },
  crossover: {
    caption: "Кроссовер",
    icon: <CrossoverIcon size={62} />,
  },
  minivan: {
    caption: "Минивен",
    icon: <MinivanIcon size={44} />,
  },
  special: {
    caption: "Специальные",
    icon: <Blocks size={28} strokeWidth={1.5} />,
  },
};
