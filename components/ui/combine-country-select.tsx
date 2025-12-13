"use client";

import * as React from "react";
import { Controller, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // shadcn Select
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
  label: string; // country name
  value: string; // phone code like '+63'
  flag: string;
  code: string;
}

interface CombinePhoneSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: CountryOption[];
  width?: string;
}

interface CombinePhoneSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: CountryOption[];
  width?: string;
  onChange?: (value: string) => void; // <-- added
}

export function CombineCountrySelect({
  control,
  name,
  label,
  placeholder = "+63",
  width = "w-full",
  options,
  onChange,
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
      render={({ field }) => (
        <FormItem className="relative w-full flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value); // keep RHF working
                onChange?.(value); // call parent custom handler
              }}
              onOpenChange={() => setSearch("")}
            >
              <SelectTrigger className={`${width} mt-2`}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const selected = options.find(
                      (o) => o.value === field.value
                    );
                    if (!selected) return null;

                    return (
                      <>
                        <span
                          className={`fi fi-${selected.code.toLowerCase()}`}
                        ></span>
                        <span>{selected.label}</span>
                      </>
                    );
                  })()}
                </div>
              </SelectTrigger>

              <SelectContent className="w-full overflow-auto">
                <div className="flex flex-col p-2 gap-2">
                  <div className="max-h-60">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span
                              className={`fi fi-${option.code.toLowerCase()}`}
                            ></span>
                            <Label className="hover:text-amber-600">
                              {option.label}
                            </Label>
                          </div>
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
      )}
    />
  );
}
