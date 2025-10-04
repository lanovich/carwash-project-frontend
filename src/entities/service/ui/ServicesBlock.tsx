import { Tabs } from "@/shared/ui";
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { mockServices } from "@/shared/lib";

const tabItems = [
  { name: "Салон", value: "salon" },
  { name: "Кузов", value: "body" },
  { name: "Химчистка", value: "dryclean" },
];

export const ServicesBlock = () => {
  const selectedCarType = "crossover";
  const [selectedCategory, setSelectedCategory] = useState<string>(
    tabItems[0].value
  );

  const filteredServices = mockServices.filter(
    (service) => service.category === selectedCategory
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      <Tabs
        tabs={tabItems}
        selectedTab={selectedCategory}
        onChange={setSelectedCategory}
      />

      <div className="flex flex-col gap-2">
        {filteredServices.map((service) => (
          <ServiceCard
            service={service}
            selectedCarType={selectedCarType}
            size="sm"
            canOrder
          />
        ))}
      </div>
    </div>
  );
};
