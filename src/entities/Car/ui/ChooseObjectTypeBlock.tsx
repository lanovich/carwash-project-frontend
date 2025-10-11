import { useDispatch, useSelector } from "react-redux";
import { CarTypeCard } from ".";
import {
  ObjectType,
  selectObjectType,
  setObjectType,
} from "@/entities/booking/model";
import { ConfirmModal } from "@/features/modals/ui";
import { useConfirmSwitch } from "@/features/modals/lib";

import { OBJECT_TYPES } from "../model";

export const ChooseObjectTypeBlock = () => {
  const dispatch = useDispatch();
  const currentObjectType = useSelector(selectObjectType);

  console.count("renderObjectTypeBlock");

  const { isOpen, trigger, close } = useConfirmSwitch<ObjectType>({
    shouldAsk: true,
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
          const isActive = currentObjectType === type;
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
