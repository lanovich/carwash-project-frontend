import { cn } from "@/shared/lib";
import { CardWrapper } from "@/shared/ui";

interface Props {
  className?: string;
  caption?: string;
  mainText: string;
  align?: "start" | "center" | "end";
}

export const TimeCard = ({ className, caption, mainText, align }: Props) => {
  return (
    <CardWrapper align={align} className={className}>
      <p className="text-start text-small text-text-subtle select-none">{caption}</p>
      <p className="text-start text-regular text-black select-none">{mainText}</p>
    </CardWrapper>
  );
};
