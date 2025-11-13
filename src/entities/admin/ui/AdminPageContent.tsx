import { useState, useMemo } from "react";
import { useAdminGetAllServicesQuery } from "@/entities/service/api";
import { ALL_CATEGORIES, Category, Service } from "@/entities/service/model";
import { AdminServiceAccordion } from "./AdminServiceAccordion";
import { InfoBlock, Input, Loading } from "@/shared/ui";
import { Search } from "lucide-react";
import { useDebounce } from "@/shared/lib/useDebounce";
import { AdminServiceCreateModal } from "@/features/create-service-modal";
import { filterServices } from "@/shared/lib";

export const AdminPageContent = () => {
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
    [searchQuery]
  );

  const filteredServicesByCategory = useMemo(() => {
    if (!services) return [];

    return ALL_CATEGORIES.map(({ name, value }) => {
      let filtered = filterServices(services, value);

      if (debouncedQuery) {
        const query = debouncedQuery.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            s.shortDescription?.toLowerCase().includes(query)
        );
      }

      return { name, value, services: filtered };
    });
  }, [services, debouncedQuery]);

  if (isLoading) return <Loading description="Получаем данные по услугам" />;

  return (
    <div className="flex flex-col p-4 sm:p-6 min-h-screen gap-2">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">
          Админка
        </h1>
        <Input
          placeholder="Глобальный поиск по услугам"
          withRightArea
          areaContent={<Search size={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredServicesByCategory.map(({ name, value, services }) => {
        if (!services.length) return null;

        return (
          <InfoBlock key={value} heading={name} className="flex flex-col gap-2">
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
