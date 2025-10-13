import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { YandexMap } from "@/features/map/ui";

export const BookingCarWashInfo = () => {
  return (
    <div className="flex flex-col h-[400px] gap-2">
      <YandexMap />
      <Button className={cn("text-white w-fit justify-self-end")} size={"xs"}>
        Информация о мойке
      </Button>
    </div>
  );
};
