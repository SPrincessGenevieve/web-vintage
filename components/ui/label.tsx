"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

type Variant = "default" | "h1" | "h2" | "p";

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  default: "text-sm font-normal",
  h1: "text-xl font-semibold text-white",
  h2: "text-base font-medium",
  p: "text-sm font-extralight",
};

function Label({ className, variant = "default", ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex text-white/70 items-center gap-2 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Label };
