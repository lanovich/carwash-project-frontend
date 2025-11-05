import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string | number | null;
}

interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  id?: string;
  value?: string | number | null;
  onChange?: (value: SelectOption["value"]) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export const Select = ({
  options,
  value,
  id,
  label,
  onChange,
  placeholder = "Выберите",
  className,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: SelectOption["value"]) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div
      ref={ref}
      className={cn("relative w-full cursor-pointer", className)}
      {...props}
    >
      {label && (
        <span
          className="text-xs font-medium text-text-secondary select-none bg-transparent"
        >
          {label}
        </span>
      )}
      <div
        className={cn(
          "w-full border border-[#B22930] bg-white text-black px-3 py-2 rounded-md flex items-center justify-between h-[40px]",
          "focus:ring-1 focus:ring-primary/60"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-small">{selectedLabel ?? placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(isOpen && "rotate-180 transition-transform")}
          color="var(--color-primary)"
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-[#B22930] rounded-md shadow-md max-h-60 overflow-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                className={cn(
                  "px-3 py-2 cursor-pointer",
                  "hover:bg-primary/20",
                  isSelected && "bg-primary/20 font-semibold"
                )}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
