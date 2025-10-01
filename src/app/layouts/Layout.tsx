import { Outlet } from "react-router-dom";
import { cn } from "@/shared/lib";
import { Header } from "@/widgets/header/ui";

type Props = {
  className?: string;
};

export function Layout({ className }: Props) {
  return (
    <div className={cn(className, "")}>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
