import { ROUTES } from "@/shared/lib";
import { Link } from "react-router-dom";

export const Logo = () => (
  <Link to={ROUTES.home} className="flex items-center gap-2">
    <img src="/logo.svg" alt="Logo" width={40} height={40} />
    <div className="text-h1">АВТОМОЙКА</div>
  </Link>
);
