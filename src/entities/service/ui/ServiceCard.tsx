import { Service } from "@/entities/service/model";
import { cn } from "@/shared/lib";
import { Checkbox } from "@/shared/ui";
import { useState } from "react";

interface Props {
  service: Service;
  selectedCarType: "sedan" | "crossover" | "minivan" | "carpet";
  size: "sm" | "md";
  canOrder?: boolean;
}

export const ServiceCard = ({
  service,
  selectedCarType,
  size = "sm",
  canOrder = false,
}: Props) => {
  const isSM = size === "sm";
  const [checked, setChecked] = useState(false);

  return (
    <div
      id={service.id}
      className={cn(
        "relative flex flex-row items-center w-full  bg-white border-primary shadow-lg rounded-lg",
        isSM
          ? "p-1.5 pr-1.5 lg:p-2 lg:pr-2 gap-1 border-1"
          : "p-2 pr-2 gap-2 min-h-[110px] border-2"
      )}
    >
      <div
        className={cn(
          "bg-bg-light-100 rounded-md flex-shrink-0",
          isSM
            ? "w-[40px] aspect-square sm:w-[112px] sm:h-[72px]"
            : "w-[124px] h-[98px]"
        )}
        style={{
          backgroundImage: `url(${service.main_image || "/logo.svg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className={cn(
          "flex flex-col justify-between flex-1",
          isSM ? "px-2" : "gap-1 px-2"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <p
            className={
              isSM ? "text-regular font-medium" : "text-h3 font-medium"
            }
          >
            {service.title}
          </p>
        </div>

        <p className="text-caption text-text-subtle">
          {service.short_description}
        </p>

        <div className="flex flex-row flex-wrap items-center gap-1 mt-1">
          {service.tags?.map((tag) => (
            <div
              key={tag}
              className="text-caption flex justify-center items-center px-2 py-1 bg-bg-light-200 rounded text-white"
            >
              {tag}
            </div>
          ))}
          {service.popular && (
            <div
              key={service.id}
              className="text-caption flex justify-center items-center px-2 py-1 bg-primary rounded text-white"
            >
              {"Выбор многих"}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-[72px]">
        <div className={cn(isSM ? "text-h3" : "text-h3")}>
          {service.prices[selectedCarType]} ₽
        </div>

        {canOrder && <Checkbox checked={checked} onChange={setChecked} />}
      </div>
    </div>
  );
};
