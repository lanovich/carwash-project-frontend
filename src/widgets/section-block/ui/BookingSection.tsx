import { cn } from "@/shared/lib";

type CardProps = {
  title?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

export const BookingSection = ({
  title,
  headerRight,
  children,
  className,
  footer,
}: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col p-3 gap-3 xl:p-5 h-fit bg-white rounded-xl w-full",
        className
      )}
    >
      {(title || headerRight) && (
        <div className="flex flex-wrap justify-between items-center h-fit">
          {title && <h2 className="text-primary text-h1">{title}</h2>}
          {headerRight && <>{headerRight}</>}
        </div>
      )}

      <div className="flex flex-col h-full gap-3">{children}</div>

      {footer && <div>{footer}</div>}
    </div>
  );
};
