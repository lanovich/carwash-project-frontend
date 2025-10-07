import { cn } from "@/shared/lib";
import { Button } from "./Button";
import { ReactNode } from "react";

export interface TabOption<Value extends string = string> {
  name?: string;
  icon?: ReactNode;
  value: Value;
}

export interface TabsProps<Value extends string = string> {
  tabs: readonly TabOption<Value>[];
  selectedTab: Value;
  onChange: (value: Value) => void;
  className?: string;
}

export const Tabs = <Value extends string>({
  tabs,
  selectedTab,
  onChange,
  className,
}: TabsProps<Value>) => {
  return (
    <div
      className={cn(
        "flex gap-1 justify-between xs:justify-start lg:gap-2 h-10 overflow-x-auto",
        className
      )}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedTab;
        return (
          <Button
            variant={"primaryGhost"}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            icon={tab.icon}
            iconOnly={!!tab.icon}
            className={cn(
              isSelected
                ? " border-primary bg-primary-light-hover text-regular font-medium"
                : "text-small"
            )}
          >
            {!tab.icon && tab.name}
          </Button>
        );
      })}
    </div>
  );
};
