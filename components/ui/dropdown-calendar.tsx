"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DropdownCalendarProps {
  label?: string;
  placeholder?: string;
  // Calendar props you want to forward
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  captionLayout?: "dropdown" | "buttons";
  className?: string;
}

export function DropdownCalendar({
  label,
  placeholder = "Select date",
  selected,
  onSelect,
  captionLayout = "dropdown",
  className,
}: DropdownCalendarProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    selected
  );

  const handleSelect = (date: Date | undefined) => {
    setInternalDate(date);
    setOpen(false);
    onSelect?.(date);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="ghost"
            id="date"
            className={`w-full border ${
              internalDate ? "text-white" : "text-white/30"
            } border-white/30 justify-between font-normal`}
          >
            {internalDate ? internalDate.toLocaleDateString() : placeholder}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={internalDate}
            captionLayout="dropdown"
            onSelect={handleSelect}
            className={className}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
