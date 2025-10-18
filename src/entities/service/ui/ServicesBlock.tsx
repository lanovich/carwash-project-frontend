import { Tabs } from "@/shared/ui";
import { useState, useEffect, type ReactElement } from "react";
import { ServiceCard } from "./ServiceCard";
import { HorizontalServiceCard } from "./HorizontalServiceCard";
import { cn } from "@/shared/lib";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { CATEGORY_GROUPS } from "../model";
import { selectObjectType } from "@/entities/booking/model";
import type { Service } from "@/entities/service/model";
import { useGetAllServicesQuery } from "@/entities/service/api";
import { Loading } from "@/shared/ui/Loading";

const viewVariants = [
  { icon: <StretchHorizontal size={16} />, value: "row" },
  { icon: <LayoutGrid size={16} />, value: "card" },
] as const;

type ViewVariant = (typeof viewVariants)[number]["value"];

export const ServicesBlock = () => {
  const selectedObjectType = useSelector(selectObjectType);

  const [selectedCategory, setSelectedCategory] =
    useState<Service["category"]>("salon");
  const [selectedView, setSelectedView] = useState<ViewVariant>("card");
  const [visible, setVisible] = useState(false);

  const { data: servicesData, isLoading } = useGetAllServicesQuery();

  useEffect(() => {
    if (selectedObjectType) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [selectedObjectType]);

  const categories = selectedObjectType
    ? CATEGORY_GROUPS[selectedObjectType]
    : [];

  useEffect(() => {
    if (
      selectedObjectType &&
      !categories.find((c) => c.value === selectedCategory)
    ) {
      setSelectedCategory(categories[0]?.value || "body");
    }
  }, [selectedObjectType]);

  if (!selectedObjectType) {
    return (
      <div className="flex items-center justify-center h-[180px] text-center text-text-subtle">
        <p>Выберите тип объекта, чтобы увидеть доступные услуги</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading size={48} />;
  }

  const filteredServices =
    servicesData?.filter((service) => service.category === selectedCategory) ||
    [];

  return (
    <div className={cn("flex flex-col gap-3 w-full", visible && "fade-in")}>
      <div className="flex flex-col sm:flex-row gap-1 sm:justify-between">
        <Tabs
          className="justify-between xs:justify-start"
          tabs={categories}
          selectedTab={selectedCategory}
          onChange={(val: Service["category"]) => setSelectedCategory(val)}
        />
        <Tabs
          className="justify-start "
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
            ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4"
            : "flex flex-col"
        )}
      >
        {filteredServices.map((service) =>
          selectedView === "card" ? (
            <ServiceCard
              key={service.id}
              service={service}
              selectedObjectType={selectedObjectType}
              canOrder
            />
          ) : (
            <HorizontalServiceCard
              key={service.id}
              service={service}
              selectedObjectType={selectedObjectType}
              size="sm"
              canOrder
            />
          )
        )}
      </div>
    </div>
  );
};
