import { cn } from "../lib";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({
  className,

  children,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-end items-center w-full mx-auto gap-6 p-6",
        className
      )}
    >
      {children}
    </div>
  );
};
