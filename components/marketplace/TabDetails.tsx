import { Label } from "@/components/ui/label";
import React from "react";

export default function TabDeatils({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Label className="text-primary-brown" variant="h2">
        {title}
      </Label>
      <Label className="text-white">{desc}</Label>
    </div>
  );
}
