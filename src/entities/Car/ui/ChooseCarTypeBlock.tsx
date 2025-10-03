import { Button } from "@/shared/ui";
import { CarTypeCard } from ".";
import { Blocks, Bus, Car, CarFront } from "lucide-react";

interface Props {
  className?: string;
}

export const OBJECT_TYPES = {
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
  carpet: {
    caption: "Ковер",
    icon: <Blocks size={40} strokeWidth={1} />,
  },
} as const;

export const ChooseCarTypeBlock = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="flex gap-2 items-stretch flex-wrap">
        {Object.entries(OBJECT_TYPES).map(([type, { caption, icon }]) => (
          <CarTypeCard key={type} caption={caption} icon={icon} />
        ))}
      </div>
      <div className="flex gap-2 mt-2 items-center justify-center-safe">
        <Button variant={"primaryGhost"}>Другое</Button>
      </div>
    </div>
  );
};
