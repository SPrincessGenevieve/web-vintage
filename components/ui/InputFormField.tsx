// components/ui/InputFormField.tsx
"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Label } from "./label";

interface InputFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  classNameLabel?: string;
  type?: string;
  onChange?: (value: string) => void; // <-- added
}

export function InputFormField({
  name,
  control,
  label,
  placeholder,
  classNameLabel,
  type = "text",
  onChange,
}: InputFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className={classNameLabel}>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              onChange={(e) => {
                field.onChange(e);          // keep RHF working
                onChange?.(e.target.value); // call custom handler if provided
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
