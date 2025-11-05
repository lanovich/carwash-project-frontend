import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { cn, formatPhone } from "@/shared/lib";

interface FormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  children: React.ReactElement<any>;
  className?: string;
}

export const FormField = <TFieldValues extends FieldValues>({
  name,
  control,
  children,
  type,
  className,
}: FormFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
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
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur();
                children.props.onBlur?.(e);
              },
              type,
              className: cn(children.props.className, className),
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
