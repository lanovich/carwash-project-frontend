import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";
import React from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",

  {
    variants: {
      variant: {
        primary: `
          bg-primary !text-white
          hover:bg-primary-hover
          active:bg-primary-active
          disabled:bg-primary-disabled
        `,
        secondary: `
          bg-secondary text-white
          hover:bg-secondary-hover
          active:bg-secondary-active
          disabled:bg-secondary-disabled
        `,
        ghost: `
          bg-transparent border border-primary text-black
          hover:bg-text-subtle/10
          active:bg-text-subtle/20
          disabled:opacity-50
        `,
        primaryGhost: `
          bg-transparent border border-primary text-primary
          hover:bg-primary-light-hover
          active:bg-primary-light-hover/70
          disabled:opacity-50
        `,
      },
      size: {
        default: "px-5 py-3 text-regular",
        xs: "px-3 py-2 text-sm",
        sm: "px-5 py-2 text-small",
        lg: "px-5 py-2 text-lg",
      },
      iconOnly: {
        true: "p-2 aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  className,
  variant,
  size = "sm",
  icon,
  iconPosition = "left",
  asChild = false,
  children,
  iconOnly,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  const isIconOnly = !children && icon;

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </span>
  );

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size: isIconOnly ? "sm" : size,
          iconOnly,
          className,
        })
      )}
      {...props}
    >
      {content}
    </Comp>
  );
};
