import { Service } from "@/entities/service/model";
import { cn } from "@/shared/lib";
import { Checkbox } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  ObjectType,
  selectSelectedServiceIds,
  toggleService,
} from "@/entities/booking/model";

interface Props {
  service: Service;
  selectedObjectType: ObjectType;
  size: "sm" | "md";
  canOrder?: boolean;
}

export const HorizontalServiceCard = ({
  service,
  selectedObjectType,
  size = "sm",
  canOrder = false,
}: Props) => {
  const dispatch = useDispatch();
  const selectedServices = useSelector(selectSelectedServiceIds);
  const checked = selectedServices.includes(service.id);

  const handleToggle = () => {
    dispatch(toggleService(service.id));
  };

  const isSM = size === "sm";

  return (
    <div
      id={service.id}
      className={cn(
        "flex items-center w-full bg-white rounded-lg shadow-lg border-primary hover:bg-primary-light-hover cursor-pointer",
        isSM ? "p-1.5 gap-1 border" : "p-2 gap-2 min-h-[110px] border-2"
      )}
      onClick={canOrder ? handleToggle : undefined}
    >
      <div
        className={cn(
          "relative flex-shrink-0 rounded-md overflow-hidden bg-bg-light-100",
          isSM
            ? "w-[40px] aspect-square sm:w-[112px] sm:h-[72px]"
            : "w-[124px] h-[98px]"
        )}
      >
        <img
          src={service.mainImage || "/logo.svg"}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div
        className={cn(
          "flex flex-col justify-between flex-1 px-2",
          !isSM && "gap-1"
        )}
      >
        <p className={cn("font-medium", isSM ? "text-regular" : "text-h3")}>
          {service.title}
        </p>

        <p className="text-caption text-text-subtle">
          {service.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-1 mt-1">
          {service.tags?.map((tag) => (
            <span
              key={tag}
              className="text-caption px-2 py-1 rounded bg-bg-light-200 text-white"
            >
              {tag}
            </span>
          ))}

          {service.popular && (
            <span className="text-caption px-2 py-1 rounded bg-primary text-white">
              Выбор многих
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between min-h-[64px] sm:min-h-[72px]">
        <div className="text-h3">{service.prices[selectedObjectType]} ₽</div>
        {canOrder && <Checkbox checked={checked} onChange={handleToggle} />}
      </div>
    </div>
  );
};
