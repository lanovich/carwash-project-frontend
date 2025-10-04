import { cn } from "@/shared/lib";
import { Button } from "./Button";

interface TabItem {
  name: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  selectedTab: string | number;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedTab,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex gap-1 justify-between xs:justify-start lg:gap-2 h-10 overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isSelected = tab.value === selectedTab;
        return (
          <Button
            variant={"primaryGhost"}
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              isSelected
                ? " border-primary bg-primary-light-hover text-regular font-medium"
                : "text-small"
            )}
          >
            {tab.name}
          </Button>
        );
      })}
    </div>
  );
};
