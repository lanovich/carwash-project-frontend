import { useGetAllServicesQuery } from "@/entities/service/api";
import { ALL_CATEGORIES, Service } from "@/entities/service/model";
import { AdminServiceAccordion } from "./AdminServiceAccordion";
import { InfoBlock, Loading } from "@/shared/ui";

export const AdminPageContent = () => {
  const { data: services = [], isLoading } = useGetAllServicesQuery();

  if (isLoading) return <Loading description="Получаем данные по услугам" />;

  return (
    <div className="flex flex-col p-4 sm:p-6 min-h-screen gap-4">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Админка
      </h1>

      {ALL_CATEGORIES.map(({ name, value }) => {
        const filteredServices = services.filter((s) => s.category === value);
        if (!filteredServices.length) return null;

        return (
          <InfoBlock key={value} heading={name}>
            <div className="flex flex-col gap-2">
              {filteredServices.map((service: Service) => (
                <AdminServiceAccordion service={service} key={service.id} />
              ))}
            </div>
          </InfoBlock>
        );
      })}
    </div>
  );
};
