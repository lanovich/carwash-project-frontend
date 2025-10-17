import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts";
import { BookingPage } from "@/pages/booking-page/ui";
import { MainPage } from "@/pages/main-page/ui";
import { ROUTES } from "@/shared/lib";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<BookingPage />} />
        <Route path={ROUTES.home} element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
