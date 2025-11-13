import { ObjectType } from "@/entities/booking/model";
import { Category, Service } from "@/entities/service/model";

type SortOrder = "asc" | "desc";

type FilterOptions = {
  priceSort?: SortOrder;
};

export function filterServices(
  servicesData: Service[] | undefined,
  selectedCategory: Category | undefined,
  selectedObjectType?: ObjectType,
  options: FilterOptions = {}
): Service[] {
  if (!servicesData) return [];

  const filtered = servicesData.filter((s) => {
    const matchesCategory =
      !selectedCategory || s.category === selectedCategory;
    const matchesObjectType = selectedObjectType
      ? s.objectTypes.includes(selectedObjectType) &&
        s.prices[selectedObjectType] !== undefined
      : true;
    return matchesCategory && matchesObjectType;
  });

  const priceOrder: SortOrder = options.priceSort ?? "desc";

  return filtered.sort((a, b) => {
    const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) return aOrder - bOrder;

    const aPrice = selectedObjectType
      ? a.prices[selectedObjectType] ?? 0
      : Object.values(a.prices ?? {}).reduce((sum, val) => sum + (val ?? 0), 0);

    const bPrice = selectedObjectType
      ? b.prices[selectedObjectType] ?? 0
      : Object.values(b.prices ?? {}).reduce((sum, val) => sum + (val ?? 0), 0);

    const priceDiff = aPrice - bPrice;
    return priceOrder === "asc" ? priceDiff : -priceDiff;
  });
}
