import { cn } from "@/shared/lib";
import { CardWrapper } from "@/shared/ui";

interface Props {
  caption: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CarTypeCard = ({
  icon,
  caption,
  className,
  active = false,
  onClick,
}: Props) => {
  return (
    <CardWrapper
      align="center"
      active={active}
      onClick={onClick}
      className={cn("cursor-pointer flex-1", className)}
    >
      {icon}
      <p className="text-sm text-center mt-1">{caption}</p>
    </CardWrapper>
  );
};
