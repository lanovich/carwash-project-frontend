import { useGetAllServicesQuery } from "@/entities/service/api";
import { ALL_CATEGORIES, Service } from "@/entities/service/model";
import { AdminServiceAccordion } from "./AdminServiceAccordion";
import { InfoBlock, Loading } from "@/shared/ui";

export const AdminPageContent = () => {
  const { services, isLoading } = useGetAllServicesQuery(undefined, {
    refetchOnMountOrArgChange: false,
    selectFromResult: ({ data, isLoading }) => ({
      services: data ?? [],
      isLoading,
    }),
  });

  if (isLoading) return <Loading description="Получаем данные по услугам" />;

  return (
    <div className="flex flex-col p-4 sm:p-6 min-h-screen gap-4">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Админка
      </h1>

      {ALL_CATEGORIES.map(({ name, value }) => {
        const filteredServices = services
          .filter((s) => s.category === value)
          .sort((a, b) => {
            const sumA = Object.values(a.prices || {}).reduce(
              (acc, val) => acc + Number(val || 0),
              0
            );
            const sumB = Object.values(b.prices || {}).reduce(
              (acc, val) => acc + Number(val || 0),
              0
            );
            return sumB - sumA; 
          });

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
