import React, { useState, useEffect } from "react";
import { Button } from "@/shared/ui";
import { ServiceObjectTypeCard } from "./ServiceObjectTypeCard";
import {
  useDeleteServiceObjectTypeMutation,
  useUpsertServiceObjectTypeMutation,
} from "@/entities/service/api";
import { objectTypesMap, OBJECT_TYPES } from "@/entities/car/model";
import { ObjectType } from "@/entities/booking/model";

interface ServiceObjectTypeBlockProps {
  serviceId: string;
  prices: Partial<Record<ObjectType, number>>;
  durations: Partial<Record<ObjectType, number>>;
}

export const ServiceObjectTypeBlock: React.FC<ServiceObjectTypeBlockProps> = ({
  serviceId,
  prices,
  durations,
}) => {
  const [localPrices, setLocalPrices] = useState(prices);
  const [localDurations, setLocalDurations] = useState(durations);

  const [upsertServiceObjectType] = useUpsertServiceObjectTypeMutation();
  const [deleteServiceObjectType] = useDeleteServiceObjectTypeMutation();

  useEffect(() => {
    setLocalPrices(prices);
    setLocalDurations(durations);
  }, [prices, durations]);

  const handleAddType = async (ot: ObjectType) => {
    try {
      await upsertServiceObjectType({ serviceId, objectType: ot }).unwrap();
      setLocalPrices((prev) => ({ ...prev, [ot]: 0 }));
      setLocalDurations((prev) => ({ ...prev, [ot]: 0 }));
    } catch (err) {
      console.error("Failed to add type:", err);
    }
  };

  const handleRemoveType = async (ot: ObjectType) => {
    try {
      await deleteServiceObjectType({ serviceId, objectType: ot }).unwrap();
      setLocalPrices((prev) => {
        const copy = { ...prev };
        delete copy[ot];
        return copy;
      });
      setLocalDurations((prev) => {
        const copy = { ...prev };
        delete copy[ot];
        return copy;
      });
    } catch (err) {
      console.error("Failed to remove type:", err);
    }
  };

  const handlePriceChange = async (ot: ObjectType, value: number) => {
    setLocalPrices((prev) => ({ ...prev, [ot]: value }));
    try {
      await upsertServiceObjectType({
        serviceId,
        objectType: ot,
        price: value,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update price:", err);
    }
  };

  const handleDurationChange = async (ot: ObjectType, value: number) => {
    setLocalDurations((prev) => ({ ...prev, [ot]: value }));
    try {
      await upsertServiceObjectType({
        serviceId,
        objectType: ot,
        duration: value,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update duration:", err);
    }
  };

  return (
    <div>
      <div className="text-xs text-text-secondary mb-1">
        Цены и длительность
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-text-secondary min-h-[126px]">
        {OBJECT_TYPES.map((ot) => {
          const { caption, icon } = objectTypesMap[ot];
          const price = localPrices[ot];
          const duration = localDurations[ot];

          return price !== undefined || duration !== undefined ? (
            <ServiceObjectTypeCard
              key={ot}
              caption={caption}
              price={price}
              duration={duration}
              onRemove={() => handleRemoveType(ot)}
              onPriceChange={(value) => handlePriceChange(ot, value)}
              onDurationChange={(value) => handleDurationChange(ot, value)}
            />
          ) : (
            <Button
              key={ot}
              type="button"
              onClick={() => handleAddType(ot)}
              className="min-h-[126px]"
            >
              <div className="flex flex-col items-center gap-1">
                {icon}
                <p className="text-wrap text-sm">{caption.toUpperCase()}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
