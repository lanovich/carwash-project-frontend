import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib";
import React, { useState } from "react";
import { Button } from "./Button";

const tabListVariants = cva(
  "flex items-center flex-wrap gap-1 lg:gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

const tabTriggerVariants = cva(
  "flex-1 flex items-center justify-center gap-2 rounded-md transition-all text-small font-medium cursor-pointer",
  {
    variants: {
      state: {
        active: "border border-primary bg-white shadow-sm text-primary",
        inactive:
          "border border-transparent bg-transparent text-black hover:bg-gray-100",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);

export interface TabOption<Value extends string = string> {
  name?: string;
  icon?: React.ReactNode;
  value: Value;
  disabled?: boolean;
  badge?: number;
}

export interface TabsProps<Value extends string = string> {
  tabs: readonly TabOption<Value>[];
  defaultValue?: Value;
  value?: Value;
  selectedTab?: Value;
  onChange?: (value: Value) => void;
  fullWidth?: boolean;
  className?: string;
}

export interface TabPanelProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
  className?: string;
}

export const TabPanel = ({
  value,
  activeValue,
  children,
  className,
}: TabPanelProps) => {
  if (value !== activeValue) return null;

  return (
    <div className={cn("animate-in fade-in duration-200", className)}>
      {children}
    </div>
  );
};

export const Tabs = <Value extends string>({
  tabs,
  defaultValue,
  value: controlledValue,
  selectedTab,
  onChange,
  fullWidth = false,
  className,
}: TabsProps<Value>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<Value | undefined>(
    defaultValue,
  );

  const selectedTabValue = selectedTab ?? controlledValue ?? uncontrolledValue;
  const isControlled =
    controlledValue !== undefined || selectedTab !== undefined;
  const firstTabValue = tabs[0]?.value;

  const handleChange = (value: Value) => {
    if (isControlled) {
      onChange?.(value);
    } else {
      setUncontrolledValue(value);
      onChange?.(value);
    }
  };

  const activeValue = selectedTabValue ?? firstTabValue;

  return (
    <div className={cn(tabListVariants({ fullWidth }), className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        const isDisabled = tab.disabled;

        return (
          <Button
            key={tab.value}
            variant="primaryGhost"
            icon={tab.icon}
            iconPosition="right"
            size={!tab.name && tab.icon ? "squareSm" : "sm"}
            disabled={isDisabled}
            badge={tab.badge}
            onClick={() => !isDisabled && handleChange(tab.value)}
            className={tabTriggerVariants({
              state: isDisabled ? "disabled" : isActive ? "active" : "inactive",
            })}
          >
            {tab.name}
          </Button>
        );
      })}
    </div>
  );
};