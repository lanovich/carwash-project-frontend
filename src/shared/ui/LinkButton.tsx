import { Link } from "react-router-dom";
import { Button, type ButtonProps } from "./Button";
import { cn } from "../lib";

interface LinkButtonProps extends Omit<ButtonProps, "asChild"> {
  to: string;
}

export const LinkButton = ({
  to,
  children,
  icon,
  className,
  iconPosition = "left",
  ...props
}: LinkButtonProps) => {
  return (
    <Button asChild {...props} className={cn("p-0", className)}>
      <Link
        to={to}
        className={cn(
          "px-5 py-2 inline-flex items-center justify-center gap-2",
        )}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </Link>
    </Button>
  );
};
