import * as React from "react";
import { cn } from "@/shared/lib";
import { cva, type VariantProps } from "class-variance-authority";

const checkboxVariants = cva(
  `
  relative flex items-center justify-center
  border-[1.5px] rounded transition-colors duration-200 ease-in-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
  `,
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      disabled,
      label,
      id,
      className,
      size,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();

    return (
      <label
        htmlFor={inputId}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            checkboxVariants({ size }),
            checked
              ? "bg-primary border-primary"
              : "bg-white border-primary hover:bg-primary/10",
            className
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => {
              e.stopPropagation();
              onChange?.(e.target.checked);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...props}
          />
          {checked && <span className="block w-2 h-2 bg-white rounded-sm" />}
        </span>

        {label && (
          <span className="text-sm text-gray-800 leading-none">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
