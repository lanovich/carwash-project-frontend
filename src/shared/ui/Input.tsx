import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const wrapperVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "h-8",
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

const areaVariants = cva("flex items-center justify-center shrink-0", {
  variants: {
    size: {
      sm: "w-8 h-8 text-small",
      md: "w-10 h-[40px]",
      lg: "w-12 h-14",
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
  "flex items-center flex-1 border transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 px-3",
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
    withLeftArea?: boolean;
    withRightArea?: boolean;
    areaContent?: React.ReactNode;
    mask?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      fullWidth,
      withLeftArea = false,
      withRightArea = false,
      areaContent,
      readOnly,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          wrapperVariants({ size, fullWidth }),
          "rounded-sm overflow-hidden"
        )}
      >
        {withLeftArea && areaContent && (
          <div className={cn(areaVariants({ size, variant }), "rounded-none")}>
            {areaContent}
          </div>
        )}

        <div
          className={cn(
            inputContainerVariants({ size, variant, readOnly }),
            withLeftArea && "rounded-r-sm",
            withRightArea && "rounded-l-sm",
            !withLeftArea && !withRightArea && "rounded-sm"
          )}
        >
          <input
            ref={ref}
            readOnly={readOnly}
            className={cn(inputVariants({ size }))}
            {...props}
          />
        </div>

        {withRightArea && areaContent && (
          <div className={cn(areaVariants({ size, variant }), "rounded-none")}>
            {areaContent}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
