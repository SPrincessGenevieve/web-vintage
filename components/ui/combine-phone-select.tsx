"use client";

import * as React from "react";
import { Controller, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "./label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

interface CountryOption {
  label: string;
  value: string;
}

interface CombinePhoneSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: CountryOption[];
  onChange?: (value: string) => void; // ⭐ added
}

export function CombinePhoneSelect({
  control,
  name,
  label,
  placeholder = "+63",
  options,
  onChange, // ⭐
}: CombinePhoneSelectProps) {
  const [search, setSearch] = React.useState("");

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.value.includes(search)
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (value: string) => {
          field.onChange(value);   // RHF update
          onChange?.(value);       // ⭐ external callback
        };

        return (
          <FormItem className="relative w-full flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              <Select
                value={field.value}
                onValueChange={handleChange}
                onOpenChange={() => setSearch("")}
              >
                <SelectTrigger className="w-25 mt-2">
                  <SelectValue placeholder={placeholder}>
                    {field.value}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="w-full overflow-auto">
                  <div className="flex flex-col p-2 gap-2">
                    <div className="max-h-60">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                          <SelectItem
                            key={index}
                            value={option.value}
                          >
                            {option.label} ({option.value})
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-1 text-sm text-gray-500">
                          No results found
                        </div>
                      )}
                    </div>
                  </div>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
