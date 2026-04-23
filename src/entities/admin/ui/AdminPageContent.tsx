import { useState } from "react";
import { useAdminGetAllServicesQuery } from "@/entities/service/api";
import { Category, Service, ALL_CATEGORIES } from "@/entities/service/model";
import { AdminServiceAccordion } from "./AdminServiceAccordion";
import { InfoBlock, Input, Loading, Tabs, TabOption } from "@/shared/ui";
import { Search, Calendar, Wrench } from "lucide-react";
import { useDebounce } from "@/shared/lib/useDebounce";
import { AdminServiceCreateModal } from "@/features/create-service-modal";
import { filterServices } from "@/shared/lib";
import { BookingAdminList } from "./BookingAdminList";
import {
  type BookingStatus,
  useGetBookingCountsQuery,
} from "@/entities/booking/api";

type TabValue = "services" | "bookings";
type FilterType = "all" | BookingStatus;

export const AdminPageContent = () => {
  const [selectedTab, setSelectedTab] = useState<TabValue>("bookings");
  const [bookingFilter, setBookingFilter] = useState<FilterType>("pending");

  const { data: counts } = useGetBookingCountsQuery(undefined, {
    pollingInterval: 60000,
  });

  const TABS: TabOption<TabValue>[] = [
    { name: "Услуги", value: "services", icon: <Wrench size={16} /> },
    {
      name: "Брони",
      value: "bookings",
      icon: <Calendar size={16} />,
      badge: counts?.pending,
    },
  ];

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

  const BOOKING_FILTERS: TabOption<FilterType>[] = [
    { name: `Все (${counts?.all})`, value: "all" },
    { name: "Новые", value: "pending", badge: counts?.pending },
    { name: "Подтверждённые", value: "confirmed", badge: counts?.confirmed },
    { name: `Отменённые`, value: "canceled" },
    { name: `Завершённые (${counts?.completed})`, value: "completed" },
  ];

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
    <div className="flex flex-col p-4 sm:p-6 min-h-screen gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Tabs
            tabs={TABS}
            selectedTab={selectedTab}
            onChange={(val) => setSelectedTab(val as TabValue)}
          />
        </div>

        {selectedTab === "bookings" ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center sm:text-left">
              Брони
            </h1>
            <Tabs
              tabs={BOOKING_FILTERS}
              selectedTab={bookingFilter}
              onChange={(val) => setBookingFilter(val as FilterType)}
            />
            <BookingAdminList filter={bookingFilter} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-center sm:text-left">
                Услуги
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
                <InfoBlock
                  key={value}
                  heading={name}
                  className="flex flex-col gap-2"
                >
                  <AdminServiceCreateModal
                    defaultCategory={value as Category}
                  />
                  <div className="flex flex-col gap-2">
                    {services.map((service: Service) => (
                      <AdminServiceAccordion
                        service={service}
                        key={service.id}
                      />
                    ))}
                  </div>
                </InfoBlock>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
