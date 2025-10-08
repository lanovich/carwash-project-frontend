import { cn } from "@/shared/lib";

interface OrderCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export const Checkbox = ({
  checked,
  onChange,
  className,
}: OrderCheckboxProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        "relative w-6 h-6 flex items-center justify-center border-2 rounded transition-colors duration-200 ease-in-out",
        checked
          ? "bg-primary border-primary"
          : "bg-white border-primary hover:bg-primary/50",
        className
      )}
    >
      <span
        className={cn(
          "block w-3 h-3 bg-white rounded-sm transform transition-transform duration-200 ease-in-out",
          checked ? "scale-100" : "scale-0"
        )}
      />
    </button>
  );
};
