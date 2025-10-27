import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header/ui";
import { Suspense } from "react";
import { LoadingPage } from "@/pages/loading-page/ui";

export function Layout() {
  return (
    <div>
      <Header />

      <Suspense
        fallback={
          <LoadingPage description="Загружаем страницу, подождите немного" />
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}
