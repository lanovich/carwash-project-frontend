import { ObjectType } from "@/entities/booking/model";
import { Category, Service } from "@/entities/service/model";

type SortOrder = "asc" | "desc";

type FilteredServices = Service[] & {
  priceSort: (order?: SortOrder) => Service[];
};

export function filterServices(
  servicesData: Service[] | undefined,
  selectedCategory: Category | undefined,
  selectedObjectType: ObjectType
): FilteredServices {
  if (!servicesData) {
    const empty: Service[] = [];
    return Object.assign(empty, {
      priceSort: () => empty,
    });
  }

  const filtered = servicesData.filter(
    (s) =>
      (!selectedCategory || s.category === selectedCategory) &&
      s.objectTypes.includes(selectedObjectType) &&
      s.prices[selectedObjectType]
  );

  return Object.assign(filtered, {
    priceSort(order: SortOrder = "desc") {
      return [...filtered].sort((a, b) => {
        const diff =
          (a.prices[selectedObjectType] ?? 0) -
          (b.prices[selectedObjectType] ?? 0);
        return order === "asc" ? diff : -diff;
      });
    },
  });
}
