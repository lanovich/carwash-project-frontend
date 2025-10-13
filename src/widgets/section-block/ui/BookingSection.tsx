import { useState } from "react";
import { cn } from "@/shared/lib";
import { ChevronDown, ChevronUp } from "lucide-react";

type CardProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  collapsible?: boolean;
};

export const BookingSection = ({
  title,
  children,
  className,
  footer,
  collapsible = false,
}: CardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => collapsible && setIsOpen((v) => !v);

  return (
    <div
      className={cn(
        "flex flex-col p-3 gap-3 xl:p-5 h-fit bg-white rounded-xl w-full",
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-center h-fit">
          <h2 className="text-primary text-h1">{title}</h2>

          {collapsible && (
            <button
              type="button"
              onClick={toggle}
              className="text-primary/70 hover:text-primary transition p-1"
            >
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}
        </div>
      )}

      {isOpen && <div className="flex flex-col h-full gap-3">{children}</div>}

      {isOpen && footer && <div>{footer}</div>}
    </div>
  );
};
