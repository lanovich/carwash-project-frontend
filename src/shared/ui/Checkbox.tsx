import { cn } from "@/shared/lib";
import { cva, type VariantProps } from "class-variance-authority";

const checkboxVariants = cva(
  "relative flex items-center justify-center border-2 rounded transition-colors duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const indicatorVariants = cva(
  "block bg-white rounded-sm transform transition-transform duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface OrderCheckboxProps extends VariantProps<typeof checkboxVariants> {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  id?: string;
}

export const Checkbox = ({
  checked,
  onChange,
  disabled,
  className,
  id,
  size,
}: OrderCheckboxProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) onChange(!checked);
  };

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        checkboxVariants({ size }),
        checked
          ? "bg-primary border-primary"
          : "bg-white border-primary hover:bg-primary/50",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <span
        className={cn(
          indicatorVariants({ size }),
          checked ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      />
    </button>
  );
};
