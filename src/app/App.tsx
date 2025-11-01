import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts";
import { ROUTES } from "@/shared/lib";
import { lazy } from "react";

const BookingPage = lazy(() => import("@/pages/booking-page/ui/BookingPage"));
const MainPage = lazy(() => import("@/pages/main-page/ui/MainPage"));
const AdminPage = lazy(() => import("@/pages/admin-page/ui/AdminPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BookingPage />} />
        <Route path={ROUTES.home} element={<MainPage />} />
        <Route path={ROUTES.admin} element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
