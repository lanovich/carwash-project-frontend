import { useDispatch, useSelector } from "react-redux";
import { CarTypeCard } from ".";
import { Blocks, Bus, Car, CarFront } from "lucide-react";
import {
  ObjectType,
  selectObjectType,
  selectSelectedServiceIds,
  setObjectType,
} from "@/entities/booking/model";

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
  const selectedServices = useSelector(selectSelectedServiceIds);

  const handleSelect = (type: ObjectType) => {
    if (selectedObjectType === type) {
      dispatch(setObjectType(null));
      return;
    }

    dispatch(setObjectType(type));
  };

  return (
    <div>
      <div className="flex gap-2 items-stretch flex-wrap">
        {Object.entries(OBJECT_TYPES).map(([type, { caption, icon }]) => {
          const isActive = selectedObjectType === type;
          return (
            <CarTypeCard
              key={type}
              caption={caption}
              icon={icon}
              active={isActive}
              onClick={() => handleSelect(type as ObjectType)}
            />
          );
        })}
      </div>
    </div>
  );
};
