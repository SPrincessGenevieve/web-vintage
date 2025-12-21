import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { user_data } from "@/lib/wine_data/user";
import { Button } from "../ui/button";

export default function TopWines() {
  const top_wines = user_data?.data.investment;
  return (
    <Card className="w-full h-full">
      <CardContent className="h-full flex flex-col">
        <div className="flex h-16 items-start justify-between">
          <Label variant="h2">Top Performing Wines</Label>
          <Button variant={"ghost"} className="p-0">
            Show All
          </Button>
        </div>
        <div>
          {top_wines
            .filter((item) => item.wines_investment_value > 0)
            .slice(0, 4)
            .map((item, index) => (
              <div
                key={item.investment_id ?? index}
                className={`w-full flex gap-4 items-center ${
                  index === 0 ? "border-b" : "border-y"
                } py-2 border-primary-brown/20`}
              >
                <div className="w-[10%] min-w-32 flex items-center justify-center">
                  <Image
                    alt="wine_image"
                    width={400}
                    height={400}
                    className="h-20 w-auto object-contain"
                    src={item.wine_images[0]}
                  />
                </div>

                <div className="w-full flex flex-col justify-between min-h-16">
                  <Label variant="h2" className="text-primary-brown">
                    {item.wine_name}
                  </Label>

                  {item.investment_type === "vint-ex" && (
                    <div className="flex top-wine-left justify-between">
                      <div className="flex">
                        <Label className="pr-4">{item.region}</Label>
                        <Label className="border-x px-4">{item.vintage}</Label>
                        <Label className="px-4">
                          {item.case_size}x
                          {item.bottle_size === "0750"
                            ? 75
                            : item.bottle_size === "1500"
                            ? 150
                            : item.bottle_size === "3000"
                            ? 300
                            : item.bottle_size === "6000"
                            ? 600
                            : 0}
                        </Label>
                      </div>

                      <div className="top-percent-cont flex w-40 gap-2 justify-end items-end">
                        <Label
                          className={`font-semibold rounded-sm px-1 ${
                            item.profit_loss > 0
                              ? "bg-green-800"
                              : "bg-primary-red-300"
                          } text-white`}
                        >
                          {item.profit_loss > 0 ? "+" : ""}
                          {Number(item.profit_loss.toFixed(2)).toLocaleString()}
                          %
                        </Label>

                        <Label className="font-semibold">
                          £{" "}
                          {Number(
                            item.wines_investment_value.toFixed(0)
                          ).toLocaleString()}
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
