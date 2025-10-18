import { cn } from "@/shared/lib";
import { CardWrapper } from "@/shared/ui";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  caption?: string;
  mainText: string;
  align?: "start" | "center" | "end";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const TimeCard: React.FC<Props> = ({
  className,
  caption,
  mainText,
  disabled,
  align = "center",
  active = false,
  onClick,
  ...rest
}) => {
  return (
    <CardWrapper
      align={align}
      active={active}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "min-w-[100px] flex-1 cursor-pointer",
        disabled && "cursor-not-allowed opacity-30 bg-bg-light-100",
        className
      )}
      {...rest}
    >
      {caption && (
        <p
          className={cn(
            "text-sm text-text-subtle select-none text-center",
            active && "text-white"
          )}
        >
          {caption}
        </p>
      )}
      <p
        className={cn(
          "text-regular select-none text-center",
          active ? "text-white" : "text-black"
        )}
      >
        {mainText}
      </p>
    </CardWrapper>
  );
};
