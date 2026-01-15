"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DropdownProps {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function DropdownMenuField({ label, placeholder, options, value, onChange }: DropdownProps) {
  const [selected, setSelected] = React.useState<string | undefined>(value);

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label>{label}</Label>}
      <Select value={selected} onValueChange={handleChange}>
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
    </div>
  );
}
