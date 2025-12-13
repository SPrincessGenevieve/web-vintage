"use client";

import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";

interface BasicOption {
  label: string;
  value: string;
}

interface SimpleDropdownInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: BasicOption[];
  onChange?: (value: string) => void;
  includeOther?: boolean; // ⭐ optional prop to include "Other"
}

export function SimpleDropdownInput({
  control,
  name,
  label,
  placeholder,
  options,
  onChange,
  includeOther = true, // default true
}: SimpleDropdownInputProps) {
  const [customMode, setCustomMode] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (value: string) => {
          field.onChange(value);
          onChange?.(value);
        };

        const handleCustomMode = () => {
          setCustomMode(true);
          setCustomValue(field.value || "");
        };

        const handleCustomInputChange = (val: string) => {
          setCustomValue(val);
          handleChange(val);
        };

        return (
          <FormItem className="flex flex-col gap-2 w-full">
            {label && <FormLabel>{label}</FormLabel>}

            <FormControl>
              {customMode ? (
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter custom value"
                    value={customValue}
                    onChange={(e) => handleCustomInputChange(e.target.value)}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit text-xs border border-white/30"
                    onClick={() => {
                      setCustomMode(false);
                      setCustomValue("");
                      handleChange("");
                    }}
                  >
                    Select from list
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`justify-between font-normal hover:text-white border-white/30 hover:bg-transparent placeholder:text-white/30 ${
                        field.value ? "text-white" : "text-white/30"
                      }`}
                    >
                      {field.value || placeholder}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    {options.map((opt, i) => (
                      <DropdownMenuItem
                        key={i}
                        onClick={() => handleChange(opt.value)}
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}

                    {includeOther && (
                      <DropdownMenuItem onClick={handleCustomMode}>
                        Other
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
