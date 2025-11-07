import { ObjectType } from "@/entities/booking/model";
import { MinivanIcon } from "@/shared/icons";
import { CrossoverIcon } from "@/shared/icons/CrossoverIcon";
import { SedanIcon } from "@/shared/icons/SedanIcon";

export const OBJECT_TYPES: ObjectType[] = [
  "sedan",
  "crossover",
  "jeep",
  "minivan",
];

export const objectTypesMap: Record<
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
  jeep: {
    caption: "Внедорожник",
    icon: <CrossoverIcon size={62} />,
  },
  minivan: {
    caption: "Минивен",
    icon: <MinivanIcon size={44} />,
  },
};
