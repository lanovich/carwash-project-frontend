import { useState } from "react";
import { ServicesTab } from "./ServicesTab";
import { BookingsTab } from "./BookingsTab";
import { AdminsListTab } from ".";
import { NotificationsTab } from "./NotificationsTab";
import { Tabs, TabOption } from "@/shared/ui";
import { Wrench, Calendar, Users, Bell } from "lucide-react";
import { useGetBookingCountsQuery } from "@/entities/booking/api";

export type TabValue = "services" | "bookings" | "admins" | "notifications";

const TABS: TabOption<TabValue>[] = [
  { name: "Услуги", value: "services", icon: <Wrench size={16} /> },
  { name: "Брони", value: "bookings", icon: <Calendar size={16} /> },
  { name: "Админы", value: "admins", icon: <Users size={16} /> },
  { name: "Уведомления", value: "notifications", icon: <Bell size={16} /> },
];

const TAB_COMPONENTS = {
  services: ServicesTab,
  bookings: BookingsTab,
  admins: AdminsListTab,
  notifications: NotificationsTab,
};

export const AdminTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValue>("bookings");

  const { data: counts } = useGetBookingCountsQuery(undefined, {
    pollingInterval: 60000,
  });

  const tabsWithBadges = TABS.map((tab) =>
    tab.value === "bookings" ? { ...tab, badge: counts?.pending } : tab,
  );

  const SelectedComponent = TAB_COMPONENTS[selectedTab];

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        tabs={tabsWithBadges}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
      />
      <SelectedComponent />
    </div>
  );
};
