"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Step3({
  onClick,
  next,
  id,
}: {
  onClick: () => void;
  next: () => void;
  id: string;
}) {
  const bottle_list = [
    {
      label: "Champagne",
      value: "Champagne",
      img: "/wine/champagne.png",
      img_outline: "/wine/champagne_outline.png",
    },
    {
      label: "Burgundy",
      value: "Burgundy",
      img: "/wine/burgundy.png",
      img_outline: "/wine/burgundy_outline.png",
    },
    {
      label: "Bordeaux",
      value: "Bordeaux",
      img: "/wine/bordeaux.png",
      img_outline: "/wine/bordeaux_outline.png",
    },
    {
      label: "Italy",
      value: "Italy",
      img: "/wine/italy.png",
      img_outline: "/wine/italy_outline.png",
    },
    {
      label: "California",
      value: "California",
      img: "/wine/california.png",
      img_outline: "/wine/california_outline.png",
    },
  ];

  const { updatePortfolioBuilderItem, portfolio_builder } =
    usePortfolioBuilder();
  const [regionSelect, setRegionSelect] = useState<string[]>([]);

  useEffect(() => {
    const region = portfolio_builder?.[0]?.region;

    if (Array.isArray(region)) {
      setRegionSelect(region);
    }
  }, [portfolio_builder?.[0]?.region]);

  const toggleRegion = (value: string) => {
    setRegionSelect((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];

      updatePortfolioBuilderItem(id, {
        region: updated,
      });

      return updated;
    });
  };

  const handleNext = () => {
    if (regionSelect.length === 0) {
      toast.warning("Select at least one region");
      return;
    }

    onClick();
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <Card className="bg-primary-gray-500/50">
        <CardContent className="p-4 bg-transparent flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {bottle_list.map((item, i) => (
              <Card
                onClick={() => toggleRegion(item.value)}
                className={`w-full ${regionSelect.includes(item.value) ? "bg-primary-gray-500" : ""} hover:bg-primary-gray-500 transition ease-in-out`}
              >
                <CardContent className="w-full bg-transparent flex items-center justify-center">
                  <div className="flex flex-col gap-2">
                    <Image
                      src={
                        regionSelect.includes(item.value)
                          ? item.img
                          : item.img_outline
                      }
                      alt=""
                      width={500}
                      height={500}
                      className="h-20 w-auto object-contain"
                    ></Image>
                    <Label className="font-semibold text-white">
                      {item.label}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Label>
            Our standard strategy is to maintain diversification. However, you
            may click above to exclude a specific region if desired.
          </Label>
        </CardContent>
      </Card>
      <div className="w-full">
        <Button onClick={handleNext} className="w-full">
          Review Preference
        </Button>
      </div>
    </div>
  );
}
