import { CardWrapper } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface Props {
  caption: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const CarTypeCard = ({
  icon,
  caption,
  active = false,
  onClick,
}: Props) => {
  return (
    <CardWrapper
      align="center"
      active={active}
      onClick={onClick}
      className="cursor-pointer flex-1"
    >
      {icon}
      <p className="text-sm text-center mt-1">{caption}</p>
    </CardWrapper>
  );
};
