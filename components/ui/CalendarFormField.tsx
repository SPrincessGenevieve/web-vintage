// components/ui/CalendarFormField.tsx
"use client";

import * as React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DropdownCalendar } from "@/components/ui/dropdown-calendar";

interface CalendarFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: Date | undefined) => void;  // <-- add this
}

export function CalendarFormField({
  name,
  control,
  label,
  placeholder,
  className,
  onChange,
}: CalendarFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DropdownCalendar
              placeholder={placeholder}
              selected={field.value}
              onSelect={(value) => {
                field.onChange(value);   // keep React Hook Form working
                onChange?.(value);       // <--- call custom handler
              }}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
