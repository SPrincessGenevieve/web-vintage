// components/ui/DropdownFormField.tsx
"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface DropdownFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void; // <-- added
}

export function DropdownFormField({
  name,
  control,
  label,
  placeholder,
  options,
  onChange,
}: DropdownFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value); // update RHF
                onChange?.(value);     // call custom handler
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
