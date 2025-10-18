import { useUserField } from "@/entities/user/lib";
import { Input } from "./Input";
import { cn, formatPhone } from "@/shared/lib";
import React from "react";
import { BookingState } from "@/entities/booking/model";
interface FormFieldProps {
  name?: keyof BookingState["user"];
  areaContent: React.ReactNode;
  placeholder: string;
  variant?: "primary" | "secondary";
  readOnly?: boolean;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
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
    type,
    onChange,
    readOnly,
    className,
  }: FormFieldProps) => {
    const [fieldValue, setFieldValue] = name
      ? useUserField(name)
      : [value ?? "", onChange ?? (() => {})];

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (name === "phone") {
          setFieldValue(formatPhone(value));
          return;
        }

        setFieldValue(value);
      },
      [setFieldValue, name]
    );

    const displayValue =
      name === "phone" ? fieldValue || "+7" : value ?? fieldValue;

    return (
      <Input
        className={cn("w-full", className)}
        withLeftArea
        type={type}
        areaContent={areaContent}
        placeholder={placeholder}
        variant={variant}
        readOnly={readOnly}
        value={displayValue}
        onChange={handleChange}
        name={name}
        autoComplete={name || "off"}
      />
    );
  }
);

FormField.displayName = "FormField";
