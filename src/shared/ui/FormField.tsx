import React from "react";
import { Controller, Control } from "react-hook-form";
import { cn, formatPhone } from "@/shared/lib";
import { ContactFormSchema } from "@/entities/user/model";

interface FormFieldProps<T> {
  name: keyof T;
  control: Control<ContactFormSchema>;
  type?: React.HTMLInputTypeAttribute;
  children: React.ReactElement<any>;
  className?: string;
}

export const FormField = <T,>({
  name,
  control,
  children,
  type,
  className,
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value;

          if (type === "tel") {
            value = formatPhone(value);
          }

          field.onChange(value);
        };

        const displayValue = type === "tel" ? field.value || "+7" : field.value;

        return (
          <div className="flex flex-col">
            {React.cloneElement(children, {
              ...field,
              value: displayValue,
              onChange: handleChange,
              className: cn(
                children.props.className,
                className,
              ),
            })}
            {fieldState.error && (
              <span className="text-red-500 text-caption">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

FormField.displayName = "FormField";
