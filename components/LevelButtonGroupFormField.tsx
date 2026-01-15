"use client";

import * as React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface LevelButtonGroupFormFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: string[];
}

export function LevelButtonGroupFormField({
  name,
  control,
  label,
  options,
}: LevelButtonGroupFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div className="flex flex-wrap gap-2">
              {options.map((item) => (
                <Button
                  key={item}
                  type="button"
                  className="border border-primary-brown"
                  variant={field.value === item ? "default" : "outline"}
                  onClick={() => field.onChange(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
