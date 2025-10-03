import { CardWrapper } from "@/shared/ui";

interface Props {
  caption: string;
  icon?: React.ReactNode;
}

export const CarTypeCard = ({ icon, caption }: Props) => {
  return (
    <CardWrapper align={"center"} className="min-w-[140px] flex-1 w-full">
      {icon}
      <p className="text-center text-nowrap text-small text-text-subtle select-none">
        {caption}
      </p>
    </CardWrapper>
  );
};
