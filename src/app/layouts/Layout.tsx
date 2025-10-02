import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header/ui";

export function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
