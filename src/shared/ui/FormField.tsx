import { useUserField } from "@/entities/user/lib";
import { Input } from "./Input";
import { cn } from "@/shared/lib";
import React from "react";
import { BookingState } from "@/entities/booking/model";
interface FormFieldProps {
  name?: keyof BookingState["user"];
  areaContent: React.ReactNode;
  placeholder: string;
  variant?: "primary" | "secondary";
  readOnly?: boolean;
  value?: string;
  className?: string;
  onChange?: () => void;
}

export const FormField = React.memo(
  ({
    name,
    areaContent,
    placeholder,
    variant,
    value,
    onChange,
    readOnly,
    className,
  }: FormFieldProps) => {
    const [fieldValue, setFieldValue] = name
      ? useUserField(name)
      : [value ?? "", onChange ?? (() => {})];

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
      },
      [setFieldValue]
    );

    return (
      <Input
        className={cn("w-full", className)}
        withLeftArea
        areaContent={areaContent}
        placeholder={placeholder}
        variant={variant}
        readOnly={readOnly}
        value={value ? value : fieldValue}
        onChange={handleChange}
      />
    );
  }
);

FormField.displayName = "FormField";
