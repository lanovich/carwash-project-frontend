import { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServiceModal } from "@/features/service-modal/ui";
import { Checkbox, Button, Tag } from "@/shared/ui";
import { CircleQuestionMark } from "lucide-react";
import { cn, formatServicePrice } from "@/shared/lib";
import { Service } from "@/entities/service/model";
import {
  ObjectType,
  selectIsServiceBlocked,
  selectIsServiceSelected,
  toggleService,
} from "@/entities/booking/model";

interface Props {
  service: Service;
  selectedObjectType: ObjectType;
  size?: "sm" | "md";
  canOrder?: boolean;
}

export const HorizontalServiceCard = ({
  service,
  selectedObjectType,
  size = "sm",
  canOrder = false,
}: Props) => {
  const dispatch = useDispatch();
  const selected = useSelector(selectIsServiceSelected(service.id));
  const blocked = useSelector(selectIsServiceBlocked(service.id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSM = size === "sm";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleToggle = () => {
    if (blocked) return;
    if (!canOrder) return openModal();
    if (!selectedObjectType) return alert("Выберите тип вашего авто");
    dispatch(toggleService(service));
  };

  const handleInfoClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <div
        id={service.id}
        onClick={!blocked && !isModalOpen ? handleToggle : undefined}
        className={cn(
          "flex items-center w-full bg-white rounded-lg shadow-lg border-primary transition-opacity duration-200",
          isSM ? "p-1.5 gap-1 border" : "p-2 gap-2 min-h-[110px] border-2",
          blocked
            ? "opacity-50 cursor-not-allowed hover:bg-white"
            : "hover:bg-primary-light-hover"
        )}
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
            src={service.mainImage || "/placeholder.jpg"}
            alt={service.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {blocked && (
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center rounded-md">
              <span className="text-white text-sm font-medium">Включено</span>
            </div>
          )}
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
              <Tag key={tag} variant="secondary">
                {tag}
              </Tag>
            ))}
            {service.popular && <Tag variant="primary">популярное</Tag>}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between min-h-[64px] sm:min-h-[72px] gap-1">
          <div className="text-h3 text-nowrap">
            {selectedObjectType &&
              formatServicePrice(service, selectedObjectType)}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="primary"
              icon={<CircleQuestionMark size={16} />}
              className="text-white border-none w-6 h-6 p-1"
              onClick={handleInfoClick}
            />
            {canOrder && (
              <Checkbox
                checked={selected}
                onChange={handleToggle}
                disabled={blocked}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ServiceModal
          canOrder={canOrder}
          isSelected={selected}
          isBlocked={blocked}
          service={service}
          isOpen={isModalOpen}
          selectedObjectType={selectedObjectType}
          onClose={closeModal}
          onConfirm={handleToggle}
        />
      )}
    </>
  );
};
