import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib";

const tagStyles = cva(
  "px-2 py-1 rounded !text-white inline-flex items-center gap-1",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-red-600",
      },
      size: {
        regular: "text-regular",
        small: "text-small",
        caption: "text-caption",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "caption",
    },
  }
);

interface TagProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  size?: "regular" | "small" | "caption";
  className?: string;
}

export const Tag = ({ children, variant, size, className }: TagProps) => {
  return (
    <span className={cn(tagStyles({ variant, size }), className)}>
      {children}
    </span>
  );
};
