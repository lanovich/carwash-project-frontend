import { Input } from "@/shared/ui";
import { X, RussianRuble } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ServiceObjectTypeCardProps {
  caption: string;
  price?: number;
  duration?: number;
  onRemove: () => void;
  onPriceChange: (value: number) => void;
  onDurationChange: (value: number) => void;
}

export const ServiceObjectTypeCard: React.FC<ServiceObjectTypeCardProps> = ({
  caption,
  price = 0,
  duration = 0,
  onRemove,
  onPriceChange,
  onDurationChange,
}) => {
  const [localPrice, setLocalPrice] = useState(price.toString());
  const [localDuration, setLocalDuration] = useState(duration.toString());

  useEffect(() => setLocalPrice(price.toString()), [price]);
  useEffect(() => setLocalDuration(duration.toString()), [duration]);

  const handlePriceBlur = () => {
    const parsed = Number(localPrice);
    if (!isNaN(parsed) && parsed !== price) onPriceChange(parsed);
  };

  const handleDurationBlur = () => {
    const parsed = Number(localDuration);
    if (!isNaN(parsed) && parsed !== duration) onDurationChange(parsed);
  };

  return (
    <div className="border rounded-md p-2 bg-white flex flex-col gap-1 relative border-primary">
      <button
        type="button"
        className="absolute top-1 right-1 text-primary"
        onClick={onRemove}
      >
        <X size={14} />
      </button>

      <div className="font-medium text-sm">{caption}</div>

      <Input
        value={localPrice}
        placeholder="Цена"
        withRightArea
        areaContent={<RussianRuble strokeWidth={1.75} size={16} />}
        onChange={(e) => setLocalPrice(e.target.value)}
        onBlur={handlePriceBlur}
      />

      <Input
        value={localDuration}
        placeholder="Минуты"
        withRightArea
        areaContent="Мин"
        onChange={(e) => setLocalDuration(e.target.value)}
        onBlur={handleDurationBlur}
      />
    </div>
  );
};
