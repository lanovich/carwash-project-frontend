import { cn } from "@/shared/lib";

interface Props {
  className?: string;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const CardWrapper = ({ className, children, align }: Props) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-between items-${align} px-4 py-3 gap-1 bg-white w-full h-fit 
        shadow-md rounded-lg border-primary border 
        hover:bg-primary-light-hover active:bg-primary-light-hover/80`,
        className
      )}
    >
      {children}
    </div>
  );
};
