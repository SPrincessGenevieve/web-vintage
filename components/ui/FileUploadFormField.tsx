"use client";

import * as React from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera } from "lucide-react";

interface FileUploadFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  accept?: string; // e.g., "image/*,application/pdf"
  onChange?: (file: File | null) => void; // <-- added
}

export function FileUploadFormField({
  name,
  control,
  label,
  accept,
  onChange,
}: FileUploadFormFieldProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="gap-2 border border-white/30 pl-2 flex items-center h-9 rounded-sm">
              <Camera size={20} strokeWidth={1} className="text-white/70" />
              <input
                className="text-white/70 text-sm"
                type="file"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  field.onChange(file); // update RHF
                  onChange?.(file); // call custom handler
                  if (file && file.type.startsWith("image/")) {
                    setPreview(URL.createObjectURL(file));
                  } else {
                    setPreview(null);
                  }
                }}
              />
            </div>
          </FormControl>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border border-white/30"
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
