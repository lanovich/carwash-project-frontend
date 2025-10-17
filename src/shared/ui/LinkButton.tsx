import { Link } from "react-router-dom";
import { Button, type ButtonProps } from "./Button";
import { cn } from "../lib";

interface LinkButtonProps extends Omit<ButtonProps, "asChild"> {
  to: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const LinkButton = ({
  to,
  children,
  icon,
  iconOnly,
  className,
  iconPosition = "left",
  ...props
}: LinkButtonProps) => {
  return (
    <Button
      iconOnly={iconOnly}
      asChild
      {...props}
      className={cn("p-0", className)}
    >
      <Link
        to={to}
        className={cn(
          "inline-flex items-center justify-center w-full py-2",
          iconOnly ? "px-2" : "px-4"
        )}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </Link>
    </Button>
  );
};
