"use client";

import * as React from "react";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}

export function FileUpload({ label, accept, onChange }: FileUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    onChange?.(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          asChild
          className="flex items-center gap-2"
        >
          <label>
            <Camera size={16} />
            <span className="ml-1">Upload</span>
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </Button>
        {file && <span className="text-sm text-white/80">{file.name}</span>}
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded-md border border-white/30"
        />
      )}
    </div>
  );
}
