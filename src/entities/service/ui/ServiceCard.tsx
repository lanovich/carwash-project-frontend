import {
  ObjectType,
  selectSelectedServiceIds,
  toggleService,
} from "@/entities/booking/model";
import { Service } from "@/entities/service/model";
import { cn } from "@/shared/lib";
import { CardWrapper, Checkbox } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  service: Service;
  selectedObjectType: ObjectType;
  canOrder?: boolean;
}

export const ServiceCard = ({
  service,
  selectedObjectType,
  canOrder = false,
}: Props) => {
  const dispatch = useDispatch();
  const selectedServiceIds = useSelector(selectSelectedServiceIds);
  const checked = selectedServiceIds.includes(service.id);

  const handleToggle = () => {
    selectedObjectType
      ? dispatch(toggleService(service.id))
      : alert("Выберите тип вашего авто");
  };

  return (
    <CardWrapper
      align="center"
      onClick={canOrder ? handleToggle : undefined}
      className={cn(
        "flex flex-col w-full min-w-[130px] h-[240px] p-2 gap-2 border-1 cursor-pointer"
      )}
    >
      <div className="relative w-full flex-1 rounded-md overflow-hidden">
        <img
          src={service.mainImage || "/logo.svg"}
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
          {service.shortDescription}
        </p>
      </div>

      <div className="flex items-end justify-between w-full">
        <div className="text-h3">{service.prices[selectedObjectType]} ₽</div>
        {canOrder && <Checkbox checked={checked} onChange={handleToggle} />}
      </div>
    </CardWrapper>
  );
};
