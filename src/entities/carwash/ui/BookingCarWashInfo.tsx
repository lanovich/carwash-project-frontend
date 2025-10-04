import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

export const BookingCarWashInfo = () => {
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex-1 bg-green-700 flex justify-center items-center rounded-md text-white text-h1">
        Здесь будет карта
      </div>
      <Button className={cn("text-white w-fit")} size={"xs"}>
        Информация о мойке
      </Button>
    </div>
  );
};
