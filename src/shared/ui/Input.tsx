import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const wrapperVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "h-10",
      md: "h-[40px]",
      lg: "h-14",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    fullWidth: true,
  },
});

const leftAreaVariants = cva("flex items-center justify-center shrink-0", {
  variants: {
    size: {
      sm: "w-9 h-10 rounded-l-sm",
      md: "w-10 h-[40px] rounded-l-md",
      lg: "w-12 h-14 rounded-l-lg",
    },
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const inputContainerVariants = cva(
  "flex items-center flex-1 border rounded-r-md transition-colors",
  {
    variants: {
      size: {
        sm: "h-10 px-3",
        md: "h-[40px] px-3",
        lg: "h-14 px-4",
      },
      variant: {
        primary: "border-[#B22930]",
        secondary: "border-secondary",
      },
      readOnly: {
        true: "bg-bg-light-100 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

const inputVariants = cva(
  "w-full bg-transparent outline-none placeholder:text-gray-400 text-black",
  {
    variants: {
      size: {
        sm: "text-caption",
        md: "text-small",
        lg: "text-regular",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof wrapperVariants> &
  VariantProps<typeof inputContainerVariants> & {
    icon?: React.ReactNode;
    withLeftArea?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      fullWidth,
      withLeftArea = false,
      icon,
      readOnly,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          wrapperVariants({ size, fullWidth }),
          className
        )}
      >
        {withLeftArea && (
          <div className={leftAreaVariants({ size, variant })}>{icon}</div>
        )}

        <div
          className={inputContainerVariants({
            size,
            variant,
            readOnly,
          })}
        >
          {!withLeftArea && icon && <span className="mr-2">{icon}</span>}
          <input
            ref={ref}
            readOnly={readOnly}
            className={inputVariants({ size })}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
