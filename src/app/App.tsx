import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts";
import { BookingPage } from "@/pages/booking-page/ui";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div />} />
        <Route path="create-order" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
