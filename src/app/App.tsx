import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts";
import { BookingPage } from "@/pages/booking-page/ui";
import { MainPage } from "@/pages/main-page/ui";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="create-order" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
