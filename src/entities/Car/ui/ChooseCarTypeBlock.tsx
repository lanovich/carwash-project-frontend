import { useDispatch, useSelector } from "react-redux";
import { CarTypeCard } from ".";
import { Blocks, Bus, Car, CarFront } from "lucide-react";
import {
  ObjectType,
  selectObjectType,
  selectSelectedServices,
  setObjectType,
} from "@/entities/booking/model";
import { ConfirmModal } from "@/features/modals/ui";
import { useConfirmSwitch } from "@/features/modals/lib";

export const OBJECT_TYPES: Record<
  ObjectType,
  { caption: string; icon: React.ReactNode }
> = {
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
  special: {
    caption: "Другое",
    icon: <Blocks size={40} strokeWidth={1} />,
  },
};

export const ChooseCarTypeBlock = () => {
  const dispatch = useDispatch();
  const selectedObjectType = useSelector(selectObjectType);
  const selectedServices = useSelector(selectSelectedServices);

  const { isOpen, trigger, close } = useConfirmSwitch<ObjectType>({
    shouldAsk: selectedServices.length > 0,
    storageKey: "switch-confirm",
    onConfirm: (type) => dispatch(setObjectType(type)),
  });

  return (
    <div>
      <ConfirmModal
        isOpen={isOpen}
        title="Изменение типа транспорта"
        message="Выбранные услуги могут сброситься для нового вида транспорта."
        dontAskAgainKey="switch-confirm"
        onClose={close}
      />

      <div className="flex gap-2 items-stretch flex-wrap">
        {Object.entries(OBJECT_TYPES).map(([type, { caption, icon }]) => {
          const isActive = selectedObjectType === type;
          return (
            <CarTypeCard
              key={type}
              caption={caption}
              icon={icon}
              active={isActive}
              onClick={() => trigger(type as ObjectType)}
            />
          );
        })}
      </div>
    </div>
  );
};
