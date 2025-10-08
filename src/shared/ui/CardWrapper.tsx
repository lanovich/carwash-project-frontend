import { cn } from "@/shared/lib";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  active?: boolean;
}

export const CardWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, align = "center", active = false, ...rest }, ref) => {
    const alignMap: Record<NonNullable<Props["align"]>, string> = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-between w-full h-fit px-4 py-3 gap-1 rounded-lg border border-primary transition-colors select-none text-nowrap",
          alignMap[align],
          active
            ? " bg-primary text-white pointer-events-none shadow-sm"
            : "bg-white shadow-sm hover:bg-primary-light-hover active:bg-primary-light-hover/80 cursor-pointer",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardWrapper.displayName = "CardWrapper";
