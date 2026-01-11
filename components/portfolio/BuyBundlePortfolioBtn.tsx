import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { ChevronDown, ShoppingBasket, Star, WineOff } from "lucide-react";
import DrawerBuy from "../marketplace/vintex/DrawerBuy";
import { Button } from "../ui/button";
import { BasketItemsT, CartItemT, SpecialBundleT } from "@/lib/types";
import DrawerBundleBuy from "../marketplace/special-bundle/DrawerBundleBuy";
import DrawerBundlePortfolioBuy from "./DrawerBundlePortfolioBuy";
import SellDialog from "../SellDialog";
import BuyDialog from "../BuyDialog";
import SellBundleDialog from "./Bundle/SellBundleDialog";
import BuyBundleDialog from "../BuyDialog";

export default function BuyBundlePortfolioBtn({ item }: { item: CartItemT }) {
  const bottle =
    item.bottle_size === "0750"
      ? 75
      : item.bottle_size === "1500"
      ? 150
      : item.bottle_size === "3000"
      ? 300
      : item.bottle_size === "6000"
      ? 600
      : 0;

  const details = [
    {
      label: "Case Size",
      value: `${item.case_size}x${bottle}cl`,
    },
    {
      label: "Region",
      value: item.fromm,
    },
    {
      label: "Grapes",
      value: item.grapes !== "" ? item.grapes : item.wine_parent.grapes ?? "",
    },
  ];

  return (
    <Card className="w-full border-primary-brown/50 p-0 max-w-[300px] bg-primary-gray-400/70">
      <CardContent className="p-0 flex flex-col justify-between h-full bg-transparent">
        <div className="flex p-2 w-full items-center justify-center gap-4 h-full  rounded-t-[14px]">
          {/* <div className="w-full">
            <SellBundleDialog item={item}></SellBundleDialog>
          </div>
          <div className="w-full">
            <BuyBundleDialog item={item}></BuyBundleDialog>
          </div> */}
          <div className="flex p-2 flex-col w-full items-end gap-4 h-full  rounded-t-[14px]">
            <div className="flex flex-col items-end">
              <Label variant="p" className="text-primary-brown">
                Market Value
              </Label>
              <Label
                variant="h1"
                className="text-primary-brown text-[25px] font-bold"
              >
                £{Number(item.basket?.market_value).toLocaleString()}
              </Label>
            </div>
            <div className="flex justify-between w-full gap-4">
              <SellBundleDialog item={item}></SellBundleDialog>
              <DrawerBundlePortfolioBuy
                item={item}
                trigger={
                  <Button className="bg-primary-brown textblack hover:text-black border-2 border-transparent h-10 hover:border-primary-brown">
                    <ShoppingBasket /> Buy this vintage
                  </Button>
                }
              ></DrawerBundlePortfolioBuy>
            </div>
          </div>
        </div>

        <div className="gap-2 p-2 py-4 border-t border-primary-brown/50 rounded-b-[14px] flex flex-col bg-primary-gray-400">
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
