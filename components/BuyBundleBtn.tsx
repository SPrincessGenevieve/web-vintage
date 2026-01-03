import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { ChevronDown, ShoppingBasket, Star, WineOff } from "lucide-react";
import DrawerBuy from "./marketplace/vintex/DrawerBuy";
import { Button } from "./ui/button";
import { BasketItemsT, SpecialBundleT } from "@/lib/types";
import DrawerBundleBuy from "./marketplace/special-bundle/DrawerBundleBuy";

interface BuyT {
  data: SpecialBundleT;
}

export default function BuyBundleBtn({ data }: BuyT) {
  const bottle =
    data.results[0].basket_bottle_size === "0750"
      ? 75
      : data.results[0].basket_bottle_size === "1500"
      ? 150
      : data.results[0].basket_bottle_size === "3000"
      ? 300
      : data.results[0].basket_bottle_size === "6000"
      ? 600
      : 0;

  const details = [
    {
      label: "Case Size",
      value: `${data.basket_details.case_size}x${bottle}cl`,
    },
    {
      label: "Region",
      value: data.basket_details.fromm,
    },
    {
      label: "Grapes",
      value: data.basket_details.grapes,
    },
  ];

  return (
    <Card className="w-full border-white/30 p-0 max-w-[300px] bg-primary-brown">
      <CardContent className="p-0 flex flex-col justify-between h-full bg-transparent">
        <div className="flex p-2 flex-col w-full items-end gap-4 h-full">
          <div className="flex flex-col items-end">
            <Label variant="p" className="text-black">
              Market Value
            </Label>
            <Label variant="h1" className="text-black text-[25px] font-bold">
              £{Number(data.basket_details.market_value).toLocaleString()}
            </Label>
          </div>
          <div className="flex justify-between w-full gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full justify-between gap-2 border-2 border-black rounded-[10px] p-2">
                <Label className="text-black font-bold text-center flex items-center justify-center w-full">
                  {/* {selectedVintage} */}---
                </Label>
                <ChevronDown size={20} color="black"></ChevronDown>
              </DropdownMenuTrigger>
            </DropdownMenu>
            <DrawerBundleBuy
              type={"special-bundle"}
              trigger={
                <Button className="bg-primary-gray-500 text-primary-brown hover:text-black border-2 border-transparent h-10 hover:border-black">
                  <ShoppingBasket /> Buy this vintage
                </Button>
              }
              parent_data={data.basket_details}
              data={data}
              result_data={data.results}
              bottle_size={data.results[0].basket_bottle_size}
              default_case_size_list={data.basket_details.case_size}
            ></DrawerBundleBuy>
          </div>
        </div>

        <div className="mt-4 gap-2 p-2 py-4 rounded-b-[14px] flex flex-col bg-primary-gray-600">
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
