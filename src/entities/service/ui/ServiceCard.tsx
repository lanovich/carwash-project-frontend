import {
  ObjectType,
  selectIsServiceBlocked,
  selectIsServiceSelected,
  toggleService,
} from "@/entities/booking/model";
import { Service } from "@/entities/service/model";
import { ServiceModal } from "@/features/service-modal/ui";
import { cn, formatServicePrice } from "@/shared/lib";
import { Button, CardWrapper, Checkbox } from "@/shared/ui";
import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = useSelector(selectIsServiceSelected(service.id));
  const blocked = useSelector(selectIsServiceBlocked(service.id));

  const handleToggle = () => {
    if (blocked) return;
    if (selectedObjectType) {
      dispatch(toggleService(service));
    } else {
      alert("Выберите тип вашего авто");
    }
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  return (
    <CardWrapper
      align="center"
      onClick={!blocked && !isModalOpen ? handleToggle : undefined}
      className={cn(
        "relative flex flex-col w-full min-w-[130px] h-[240px] p-2 gap-2 border-1 transition-opacity cursor-pointer hover:shadow-md",
        blocked && "cursor-not-allowed"
      )}
    >
      {blocked && <div className="absolute inset-0 bg-black/30 z-10" />}

      <div className="absolute top-2 right-2 z-20 pointer-events-auto">
        <Button
          variant="primary"
          icon={<CircleQuestionMark size={16} />}
          iconOnly
          className=" text-white bg-primary/60"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsModalOpen(true);
          }}
        />
      </div>

      <div className="relative w-full flex-1 rounded-md overflow-hidden">
        <img
          src={service.mainImage || "/placeholder.jpg"}
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

      <div className="flex items-end justify-between w-full gap-2">
        <div className="text-regular font-medium">
          {formatServicePrice(service, selectedObjectType) || "-"}
        </div>
        {canOrder && (
          <Checkbox
            checked={selected}
            onChange={handleToggle}
            disabled={blocked}
          />
        )}
      </div>
      {isModalOpen && (
        <ServiceModal
          isSelected={selected}
          isBlocked={blocked}
          service={service}
          selectedObjectType={selectedObjectType}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleToggle}
        />
      )}
    </CardWrapper>
  );
};
