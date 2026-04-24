import { AdminTabs } from "./AdminTabs";

export const AdminPageContent = () => {
  return (
    <div className="flex flex-col p-4 sm:p-6 min-h-screen gap-2">
      <AdminTabs />
    </div>
  );
};