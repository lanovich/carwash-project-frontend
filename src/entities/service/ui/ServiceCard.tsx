import { Service } from "@/entities/service/model";
import { cn } from "@/shared/lib";
import { CardWrapper, Checkbox } from "@/shared/ui";
import { useState } from "react";

interface Props {
  service: Service;
  selectedCarType: "sedan" | "crossover" | "minivan" | "carpet";
  canOrder?: boolean;
}

export const ServiceCard = ({
  service,
  selectedCarType,
  canOrder = false,
}: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <CardWrapper
      align="center"
      className={cn(
        "flex flex-col w-full min-w-[130px] h-[240px] p-2 gap-2 border-1"
      )}
    >
      <div className="relative w-full flex-1 rounded-md overflow-hidden">
        <img
          src={service.main_image || "/logo.svg"}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col w-full">
        <p className="text-small font-medium truncate w-full">
          {service.title}
        </p>

        <p className="text-caption text-text-subtle truncate">
          {service.short_description}
        </p>
      </div>

      <div className="flex items-end justify-between w-full">
        <div className="text-h3">{service.prices[selectedCarType]} ₽</div>
        {canOrder && <Checkbox checked={checked} onChange={setChecked} />}
      </div>
    </CardWrapper>
  );
};
