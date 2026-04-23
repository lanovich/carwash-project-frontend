import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib";

const badgeVariants = cva(
  "absolute flex items-center justify-center rounded-full font-bold text-white bg-primary",
  {
    variants: {
      size: {
        sm: "min-w-4 h-4 px-1 text-[10px]",
        md: "min-w-5 h-5 px-1 text-xs",
        lg: "min-w-6 h-6 px-1.5 text-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const getBadgeSize = (value: number) => (value > 99 ? "md" : value > 9 ? "sm" : "sm");

const formatBadge = (value: number) => (value > 99 ? "99+" : value);

export interface BadgeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Badge = ({ value, size, className }: BadgeProps) => {
  if (value <= 0) return null;

  const badgeSize = size ?? getBadgeSize(value);

  return (
    <span className={cn(badgeVariants({ size: badgeSize }), className)}>
      {formatBadge(value)}
    </span>
  );
};