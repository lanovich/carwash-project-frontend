import { cn } from "../lib";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("w-full mx-auto max-w-[1540px] p-6", className)}>
      {children}
    </div>
  );
};
