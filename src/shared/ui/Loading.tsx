import { TbSteeringWheelFilled } from "react-icons/tb";
import { cn } from "../lib";

interface LoadingProps {
  size?: number;
  className?: string;
  color?: string;
  description?: string;
}

export const Loading = ({
  size = 32,
  className,
  color = "black",
  description,
}: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center py-4",
        className
      )}
    >
      <TbSteeringWheelFilled
        className="animate-spin"
        size={size}
        color={color}
      />
      {description && (
        <span className="mt-2 text-center text-sm text-text-subtle">
          {description}
        </span>
      )}
    </div>
  );
};
