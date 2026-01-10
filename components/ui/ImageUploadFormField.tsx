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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Camera } from "lucide-react";
import Cropper from "react-easy-crop";

interface ImageUploadFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  accept?: string; // e.g., "image/*"
  onChange?: (file: File | null) => void;
}

function getCroppedImg(imageSrc: string, crop: any): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // important if images come from other sources
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d")!;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject("Canvas is empty");
        resolve(new File([blob], "cropped.png", { type: "image/png" }));
      }, "image/png");
    };
    image.onerror = reject;
  });
}

export function ImageUploadFormField({
  name,
  control,
  label,
  accept,
  onChange,
}: ImageUploadFormFieldProps) {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);

  const handleCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const applyCrop = async (fieldOnChange: (file: File) => void) => {
    if (imageSrc && croppedAreaPixels) {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      fieldOnChange(croppedFile);
      onChange?.(croppedFile);

      // Update preview
      const previewUrl = URL.createObjectURL(croppedFile);
      setImageSrc(previewUrl);

      // Reset cropper state
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2 w-full">
              {!imageSrc && (
                <div className="flex items-center gap-2 border border-white/30 p-2 rounded">
                  <Camera size={20} className="text-white/70" />
                  <input
                    type="file"
                    accept={accept}
                    className="text-white/70 text-sm"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file || !file.type.startsWith("image/")) return;
                      setImageSrc(URL.createObjectURL(file));
                    }}
                  />
                </div>
              )}

              {imageSrc && (
                <Card className="relative mt-2 w-full h-64 bg-black/30">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-2">
                    <Slider
                      value={[zoom]}
                      min={1}
                      max={3}
                      step={0.01}
                      onValueChange={(value) => setZoom(value[0])}
                    />
                    <div className="flex gap-2">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => applyCrop(field.onChange)}
                        >
                          Apply Crop
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => setImageSrc(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
