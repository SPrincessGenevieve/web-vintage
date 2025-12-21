import React from "react";
import { Label } from "../ui/label";

interface DetailCardT {
  name: string;
  alcohol_abv: string;
  blend: string;
  grapes: string;
  ownership: string;
}

export default function DetailsCard({
  name,
  alcohol_abv,
  blend,
  grapes,
  ownership,
}: DetailCardT) {
  return (
    <div>
      <Label variant="h1" className="text-primary-brown">{name}</Label>
      <div className="mt-4 flex flex-col gap-4">
        <div className="border-b pb-4 border-primary-brown/30 flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Alcohol ABV
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {alcohol_abv=== "NA" ? "--" : alcohol_abv}
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Blend
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {blend=== "NA" ? "--" : blend}
            </Label>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Grapes
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {grapes=== "NA" ? "--" : grapes}
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Ownership
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {ownership === "NA" ? "--" : ownership}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
