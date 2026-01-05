"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthYearPickerProps {
  label?: string;
  placeholder?: string;
  selected?: Date;
  onSelect?: (value: string) => void; // returns YY/MM
  className?: string;
}

export function MonthYearPicker({
  label,
  placeholder = "YY/MM",
  selected,
  onSelect,
  className,
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    selected
  );

  const handleSelect = (date: Date | undefined) => {
    setInternalDate(date);
    setOpen(false);
    if (date) {
      const yy = date.getFullYear().toString().slice(2);
      const mm = (date.getMonth() + 1).toString().padStart(2, "0");
      onSelect?.(`${yy}/${mm}`);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label htmlFor="month-year">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="month-year"
            variant="ghost"
            className={`w-full border border-white/30 justify-between font-normal text-left ${
              internalDate ? "text-white" : "text-white/30"
            }`}
          >
            {internalDate
              ? `${internalDate.getFullYear().toString().slice(2)}/${(
                  internalDate.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}`
              : placeholder}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 rounded-2xl" // fully stylable radius
          align="start"
        >
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleSelect}
            className={className}
            defaultView="year" // shows year first for easy month selection
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
