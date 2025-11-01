import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const wrapperVariants = cva("flex items-center ", {
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
      error: "border-red-500 focus-within:ring-2 focus-within:ring-red-500/40",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const inputVariants = cva(
  `
  w-full bg-white text-black placeholder-gray-400 outline-none
  border transition-all placeholder:text-text-secondary
  focus:ring-1 focus:ring-primary/60 focus:border-primary
  disabled:opacity-50 disabled:cursor-not-allowed
  `,
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-[40px] px-3 text-small",
        lg: "h-14 px-4 text-regular",
      },
      variant: {
        primary: "border-[#B22930]",
        secondary: "border-secondary",
        error: "border-red-500",
      },
      readOnly: {
        true: "bg-bg-light-100 pointer-events-none opacity-75",
        false: "",
      },
      withLeftArea: {
        true: "rounded-r-md rounded-l-none",
        false: "",
      },
      withRightArea: {
        true: "rounded-l-md rounded-r-none",
        false: "",
      },
      rounded: {
        true: "rounded-md",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      readOnly: false,
      withLeftArea: false,
      withRightArea: false,
      rounded: true,
    },
  }
);

export type InputProps = {
  label?: string;
  errorText?: string;
  withLeftArea?: boolean;
  withRightArea?: boolean;
  areaContent?: React.ReactNode;
  mask?: string;
} & VariantProps<typeof wrapperVariants> &
  VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

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
      label,
      errorText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1 rounded-md">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-text-secondary select-none bg-transparent"
          >
            {label}
          </label>
        )}

        <div className="flex w-full gap-0">
          {withLeftArea && areaContent && (
            <div
              className={cn(areaVariants({ size, variant }), "rounded-l-md")}
            >
              {areaContent}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            readOnly={readOnly}
            className={cn(
              inputVariants({
                size,
                variant: errorText ? "error" : variant,
                readOnly,
                withLeftArea,
                withRightArea,
                rounded: !withLeftArea && !withRightArea,
              })
            )}
            {...props}
          />
          {withRightArea && areaContent && (
            <div
              className={cn(areaVariants({ size, variant }), "rounded-r-md")}
            >
              {areaContent}
            </div>
          )}
        </div>

        {errorText && (
          <p className="text-xs text-red-500 font-medium">{errorText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
