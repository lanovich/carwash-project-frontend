import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";
import React from "react";
import { Badge, type BadgeProps } from "./Badge";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",

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
        xs: "px-3 py-2 text-caption",
        sm: "px-5 py-2 text-sm",
        lg: "px-5 py-2 text-lg",
        squareXs: "size-8 p-2",
        squareSm: "size-10 p-2",
        squareMd: "size-12 p-2",
        squareLg: "size-14 p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "icon">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  badge?: BadgeProps["value"];
  badgeSize?: BadgeProps["size"];
}

export const Button = ({
  className,
  variant,
  size = "sm",
  icon,
  iconPosition = "left",
  asChild = false,
  children,
  type = "button",
  badge,
  badgeSize,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(
        "relative inline-flex",
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      <span className={cn("inline-flex items-center justify-center gap-2")}>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
        <Badge
          value={badge ?? 0}
          size={badgeSize}
          className="-top-1 -right-1"
        />
      </span>
    </Comp>
  );
};
