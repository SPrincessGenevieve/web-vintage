"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button } from "./button";
import { Eye, EyeClosed } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string; // optional label prop
  open?: boolean;
  securityOff?: boolean;
}

function Input({
  label,
  className,
  open,
  securityOff = false,
  type = "text",
  ...props
}: InputProps) {
  const [eye, setEye] = React.useState(open ?? false); // default false

  const toggleEye = () => setEye(!eye);

  // Determine input type based on eye toggle
  const inputType = securityOff ? (eye ? "text" : "password") : type;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="w-full relative">
        {securityOff && (
          <Button
            onClick={toggleEye}
            className="p-0 absolute z-10 right-0 top-1/2 -translate-y-1/2"
            variant="ghost"
          >
            {eye ? <EyeClosed className="text-primary-brown" /> : <Eye className="text-primary-brown" />}
          </Button>
        )}
        <input
          type={inputType} // ✅ use inputType here
          data-slot="input"
          className={cn(
            "text-white file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-white/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-primary-brown focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { Input };
