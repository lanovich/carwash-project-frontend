import { cn } from "@/shared/lib";

interface Props {
  size?: "default" | "lg" | "md";
  className?: string;
  name?: string;
  value?: string;
}

export const BookingRow = ({
  size = "default",
  name,
  value,
  className,
}: Props) => {
  const isLG = size === "lg";
  const isMD = size === "md";

  return (
    <div
      className={cn(
        "flex flex-col justify-end hover:bg-bg-light/50 rounded-sm",
        className
      )}
    >
      <div className="flex justify-between items-end w-full">
        {name && (
          <p
            className={cn(
              "truncate max-w-1/2",
              isLG ? "text-h3" : "text-regular"
            )}
          >
            {name}
          </p>
        )}
        {name && value && (
          <div className="border-b-1 border-dashed flex-1 mb-[6px] border-black" />
        )}
        {value && (
          <p
            className={cn(
              isLG ? "text-h3" : isMD ? "text-small" : "text-regular",
              name && "font-normal"
            )}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
};
