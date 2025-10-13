import { cn } from "@/shared/lib";
import { CardWrapper } from "@/shared/ui";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  caption?: string;
  mainText: string;
  align?: "start" | "center" | "end";
  active?: boolean;
  onClick?: () => void;
}

export const TimeCard: React.FC<Props> = ({
  className,
  caption,
  mainText,
  align = "center",
  active = false,
  onClick,
  ...rest
}) => {
  return (
    <CardWrapper
      align={align}
      active={active}
      onClick={onClick}
      className={cn("min-w-[100px] flex-1 cursor-pointer", className)}
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
