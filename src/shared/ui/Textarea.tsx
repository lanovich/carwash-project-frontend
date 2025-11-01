import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

export const textareaVariants = cva(
  `
  w-full rounded-md border border-primary bg-white
  text-gray-900 placeholder:text-text-secondary
  transition-all resize-none
  focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary
  disabled:opacity-50 disabled:cursor-not-allowed
  `,
  {
    variants: {
      variant: {
        default: "",
        error: "border-red-500 focus:ring-red-500 focus:border-red-500",
        success: "border-green-500 focus:ring-green-500 focus:border-green-500",
      },
      size: {
        sm: "text-caption p-2",
        md: "text-small p-3",
        lg: "text-regular p-4",
      },
      shadow: {
        true: "shadow-sm hover:shadow-md transition-shadow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shadow: false,
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  errorText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, shadow, label, errorText, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          className={cn(textareaVariants({ variant, size, shadow, className }))}
          {...props}
        />

        {errorText && (
          <p className="text-xs text-red-500 font-medium">{errorText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
