"use client";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import React from "react";
import { WineImage } from "../marketplace/WineImage";
import { Label } from "../ui/label";
import { Dot } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export default function SummaryDetailWine() {
  const { cart_summary } = useCartSummary();
  console.log("CART: ", cart_summary);

  return (
    <div className="flex flex-col gap-4">
      {cart_summary.map((item, index) => {
        const vintage =
          item.basket === null && item.user_investment_wine_vintage === null
            ? item.stock_wine_vintage?.vintage ?? ""
            : item.basket?.vintage;

        const bottle_size =
          Array.isArray(item.basket_items) && item.basket_items.length > 0
            ? item.basket_items[0].basket_bottle_size || "0750"
            : item.stock_wine_vintage?.bottle_size || "0750";
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
        const market_value =
          item.basket !== null
            ? item.basket.market_value
            : item.stock_wine_vintage?.market_value;

        const total =
          (Number(market_value) || 1) * Number(item.quantity) * item.case_size;

        return (
          <div key={index} className="flex gap-4">
            <div className="w-40">
              <WineImage
                type={item.basket === null ? "vint-ex" : "special-bundle"}
                src={
                  item.basket === null
                    ? item.images[0] || ""
                    : item.basket.image
                }
              ></WineImage>
            </div>
            <div className="w-full">
              <Label variant="h2" className="text-primary-brown">
                {item.wine_name}
              </Label>
              <div className="flex gap-2 items-center">
                {vintage && (
                  <>
                    <Label>{vintage}</Label>
                    <Dot color="white"></Dot>
                  </>
                )}
                <Label>
                  {item.case_size}x{bottle}cl
                </Label>
              </div>
              <Label className="text-white">{item.quantity}x</Label>

              <div className="w-full flex justify-end">
                <Label variant="h2" className="text-white">
                  £ {Number(total.toFixed(2)).toLocaleString()}
                </Label>
              </div>
              {item.photo_request && (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={item.photo_request}></Checkbox>
                    <Label>Photo Request</Label>
                  </div>
                  <Label>£ 16.99</Label>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
