import { Tabs } from "@/shared/ui";
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { cn, mockServices } from "@/shared/lib";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import type { ReactElement } from "react";
import { HorizontalServiceCard } from "./HorizontalServiceCard";

const categories = [
  { name: "Салон", value: "salon" },
  { name: "Кузов", value: "body" },
  { name: "Химчистка", value: "dryclean" },
] as const;

type CategoryValue = (typeof categories)[number]["value"];

const viewVariants = [
  { icon: <StretchHorizontal size={16} />, value: "row" },
  { icon: <LayoutGrid size={16} />, value: "card" },
] as const;

type ViewVariant = (typeof viewVariants)[number]["value"];

export const ServicesBlock = () => {
  const selectedCarType = "crossover";

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue>("body");
  const [selectedView, setSelectedView] = useState<ViewVariant>("card");

  const filteredServices = mockServices.filter(
    (service) => service.category === selectedCategory
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row gap-1 sm:justify-between">
        <Tabs
          tabs={categories}
          selectedTab={selectedCategory}
          onChange={(val: CategoryValue) => setSelectedCategory(val)}
        />
        <Tabs
          tabs={viewVariants.map(({ icon, value }) => ({
            icon: icon as ReactElement,
            value,
          }))}
          selectedTab={selectedView}
          onChange={(val: ViewVariant) => setSelectedView(val)}
        />
      </div>

      <div
        className={cn(
          "gap-1",
          selectedView === "card"
            ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
            : "flex flex-col"
        )}
      >
        {filteredServices.map((service) =>
          selectedView === "card" ? (
            <ServiceCard
              key={service.id}
              service={service}
              selectedCarType={selectedCarType}
              canOrder
            />
          ) : (
            <HorizontalServiceCard
              key={service.id}
              service={service}
              selectedCarType={selectedCarType}
              size="sm"
              canOrder
            />
          )
        )}
      </div>
    </div>
  );
};
