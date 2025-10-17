import { ObjectType } from "@/entities/booking/model";
import { OBJECT_TYPES } from "@/entities/car/model";
import { cn } from "@/shared/lib";

interface Props {
  prices: Partial<Record<ObjectType, number>>;
  duration: Partial<Record<ObjectType, number>>;
  selectedObjectType: ObjectType;
}

export const ServicePrices = ({
  prices,
  duration,
  selectedObjectType,
}: Props) => {
  if (!Object.keys(prices).length) return null;

  return (
    <div className="flex gap-2 items-stretch flex-wrap text-nowrap">
      {Object.entries(prices).map(([type, price]) => {
        const dur = duration?.[type as ObjectType] ?? null;
        const isSelected = type === selectedObjectType;

        return (
          <div
            key={type}
            className={cn(
              "flex flex-1 w-full justify-between items-center p-3 gap-2 rounded-md shadow-sm",
              isSelected
                ? "border-1 border-primary bg-primary-hover/10"
                : "border border-bg-light"
            )}
          >
            <span className="capitalize text-black font-medium">
              {OBJECT_TYPES[type as ObjectType].caption}
            </span>
            {price ? (
              <span className="text-primary font-semibold">
                {price} ₽{dur ? ` | ${dur} мин` : ""}
              </span>
            ) : (
              <span className="text-text-subtle font-medium">—</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
