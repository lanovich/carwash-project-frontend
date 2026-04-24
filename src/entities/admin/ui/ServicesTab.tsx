import { useState } from "react";
import { useAdminGetAllServicesQuery } from "@/entities/service/api";
import { AdminServiceAccordion } from "./AdminServiceAccordion";
import { InfoBlock, Input, Loading } from "@/shared/ui";
import { Search } from "lucide-react";
import { useDebounce } from "@/shared/lib/useDebounce";
import { AdminServiceCreateModal } from "@/features/create-service-modal";
import { filterServices } from "@/shared/lib";
import { type Category, ALL_CATEGORIES, type Service } from "@/entities/service/model";

export const ServicesTab = () => {
  const { services, isLoading } = useAdminGetAllServicesQuery(undefined, {
    refetchOnMountOrArgChange: false,
    selectFromResult: ({ data, isLoading }) => ({
      services: data ?? [],
      isLoading,
    }),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useDebounce(
    () => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    },
    300,
    [searchQuery],
  );

  const filteredServicesByCategory = ALL_CATEGORIES.map(({ name, value }) => {
    let filtered = filterServices(services ?? [], value);

    if (debouncedQuery) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.shortDescription?.toLowerCase().includes(query),
      );
    }

    return { name, value, services: filtered };
  });

  if (isLoading) return <Loading description="Получаем данные по услугам" />;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-center sm:text-left">Услуги</h1>
      <Input
        placeholder="Глобальный поиск по услугам"
        withRightArea
        areaContent={<Search size={18} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredServicesByCategory.map(({ name, value, services }) => {
        if (!services.length) return null;

        return (
          <InfoBlock
            key={value}
            heading={name}
            className="flex flex-col gap-2"
          >
            <AdminServiceCreateModal defaultCategory={value as Category} />
            <div className="flex flex-col gap-2">
              {services.map((service: Service) => (
                <AdminServiceAccordion service={service} key={service.id} />
              ))}
            </div>
          </InfoBlock>
        );
      })}
    </div>
  );
};