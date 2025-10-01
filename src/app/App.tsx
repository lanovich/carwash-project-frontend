import { Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts";
import { CreateOrderPage } from "@/pages/CreateOrderPage/ui";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div />} />
        <Route path="create-order" element={<CreateOrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
