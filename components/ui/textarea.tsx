import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string; // <-- add label prop
}

function Textarea({ className, label, ...props }: TextareaProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <textarea
        data-slot="textarea"
        className={cn(
          "border-white/30 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea };
