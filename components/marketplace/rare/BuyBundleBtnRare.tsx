import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ChevronDown, ShoppingBasket, Star, WineOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpecialBundleT, WineRareResultsT } from "@/lib/types";
import DrawerBundleBuy from "../special-bundle/DrawerBundleBuy";
import DrawerRareBundleBuy from "./DrawerRareBundleBuy";

export default function BuyBundleBtnRare({ data, market_value }: { data: WineRareResultsT, market_value: number }) {
  const bottle_size = data?.basket_items?.[0].basket_bottle_size;
  const bottle =
    bottle_size === "0750"
      ? 75
      : bottle_size === "1500"
      ? 150
      : bottle_size === "3000"
      ? 300
      : bottle_size === "6000"
      ? 600
      : 0;


  const details = [
    {
      label: "Case Size",
      value: `${data.case_size}x${bottle}cl`,
    },
    {
      label: "Region",
      value: data?.basket_details?.fromm ?? "",
    },
    {
      label: "Grapes",
      value: data?.basket_details?.grapes ?? "",
    },
  ];

  console.log("BUNDLE QUANTITY: ", data.quantity)

  return (
    <Card className="w-full border-primary-brown/50 p-0 max-w-[300px] bg-primary-gray-400/70">
      <CardContent className="p-0 flex flex-col justify-between h-full bg-transparent">
        <div className="flex p-2 flex-col w-full items-end gap-4 h-full  rounded-t-[14px]">
          <div className="flex flex-col items-end">
            <Label variant="p" className="text-primary-brown">
              Market Value
            </Label>
            <Label
              variant="h1"
              className="text-primary-brown text-[25px] font-bold"
            >
              £{Number(market_value).toLocaleString()}
            </Label>
          </div>
          <div className="flex justify-between w-full gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full justify-between gap-2 border-2 border-primary-brown rounded-[10px] p-2">
                <Label className="text-primary-brown font-bold text-center flex items-center justify-center w-full">
                  {/* {selectedVintage} */}---
                </Label>
                <ChevronDown
                  size={20}
                  className="text-primary-brown"
                ></ChevronDown>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <DrawerRareBundleBuy
              type={"special-bundle"}
              trigger={
                <Button className="bg-primary-brown textblack hover:text-black border-2 border-transparent h-10 hover:border-primary-brown">
                  <ShoppingBasket /> Buy this vintage
                </Button>
              }
              data={data}
            ></DrawerRareBundleBuy>
          </div>
        </div>

        <div className="mt-4 gap-2 p-2 py-4 border-t border-primary-brown/50 rounded-b-[14px] flex flex-col bg-primary-gray-400">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between">
              <Label className="text-primary-brown font-thin">
                {item.label}
              </Label>
              <Label
                variant="h2"
                className="bg-primary-brown text-black rounded-[7px] px-2"
              >
                {item.value}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
