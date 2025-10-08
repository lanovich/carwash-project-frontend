import { Input } from "./Input";
import { cn } from "@/shared/lib";
import React from "react";

interface FormFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  variant?: "primary" | "secondary";
  readOnly?: boolean;
  value: string | null;
  onChange?: (value: string) => void;
  className?: string;
}

export const FormField = React.memo(
  ({
    icon,
    placeholder,
    variant,
    readOnly,
    value,
    onChange,
    className,
  }: FormFieldProps) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    return (
      <Input
        className={cn("w-full", className)}
        withLeftArea
        icon={icon}
        placeholder={placeholder}
        variant={variant}
        readOnly={readOnly}
        value={value ?? ""}
        onChange={handleChange}
      />
    );
  }
);

FormField.displayName = "FormField";
