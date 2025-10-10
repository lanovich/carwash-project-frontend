import {
  ObjectType,
  selectIsServiceBlocked,
  selectIsServiceSelected,
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

  const selected = useSelector(selectIsServiceSelected(service.id));
  const blocked = useSelector(selectIsServiceBlocked(service.id));

  const handleToggle = () => {
    if (blocked) return;
    if (selectedObjectType) {
      dispatch(toggleService(service));
    } else {
      alert("Выберите тип вашего авто");
    }
  };

  return (
    <CardWrapper
      align="center"
      onClick={canOrder && !blocked ? handleToggle : undefined}
      className={cn(
        "flex flex-col w-full min-w-[130px] h-[240px] p-2 gap-2 border-1 transition-opacity",
        blocked
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:shadow-md"
      )}
    >
      <div className="relative w-full flex-1 rounded-md overflow-hidden">
        <img
          src={service.mainImage || "/logo.svg"}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {blocked && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Включено</span>
          </div>
        )}
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
        <div className="text-h3">
          {selectedObjectType ? service.prices[selectedObjectType] : "-"} ₽
        </div>
        {canOrder && (
          <Checkbox
            checked={selected}
            onChange={handleToggle}
            disabled={blocked}
          />
        )}
      </div>
    </CardWrapper>
  );
};

