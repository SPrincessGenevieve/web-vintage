"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CartItemT } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { AlertCircle, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRare } from "@/context/RareContext";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "@/components/ui/spinner";
import { usePortfolio } from "@/context/PortfolioContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SellBundleDialog({ item }: { item: CartItemT }) {
  const { addToRare } = useRare();
  const { removeFromPortfolio } = usePortfolio();
  const bottle_size =
    item.bottle_size === "0750"
      ? 75
      : item.bottle_size === "1500"
      ? 150
      : item.bottle_size === "3000"
      ? 300
      : item.bottle_size === "6000"
      ? 600
      : 0;

  const [quantity, setQuantity] = useState(item.quantity);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const price = item.basket?.market_value ?? 0;
  const total = price * item.case_size * item.quantity;

  const handleSell = () => {
    setLoading(true);
    const numericId = Date.now().toString() + Math.floor(Math.random() * 1000);
    console.log("Numeric ID:", numericId);
    try {
      addToRare({
        investment_id: Number(numericId),
        case_size: item.case_size,
        quantity: item.quantity,
        market_value: item.basket?.market_value ?? 0,
        is_owner: true,
        wine_vintage_details: {
          id: item.stock_wine_vintage?.id ?? 0,
          name: item.wine_name,
          lwin11: item.stock_wine_vintage?.lwin11 ?? "",
          vintage: item.vintage ?? 0,
          rp_score: item.stock_wine_vintage?.rp_score ?? "",
          release_price: item.stock_wine_vintage?.release_price ?? 0,
          rp_released: item.stock_wine_vintage?.release_price ?? "",
          rp_tasting_notes: item.rp_tasting_notes ?? "",
          rp_reviewer: item.stock_wine_vintage?.rp_reviewer ?? "",
          holding_years: item.stock_wine_vintage?.holding_years ?? "",
          liv_ex_value: item.stock_wine_vintage?.liv_ex_value ?? 0,
          is_listed: true,
          size: item.stock_wine_vintage?.size ?? "",
          status: item.stock_wine_vintage?.status ?? "",
          drinking_window: item.stock_wine_vintage?.drinking_window ?? "",
          market_value: String(item.stock_wine_vintage?.market_value) ?? "",
          tags: item.stock_wine_vintage?.tags ?? "",
          processed_case: item.stock_wine_vintage?.liv_ex_value ?? 0,
          bottle_size: item.stock_wine_vintage?.bottle_size ?? "",
          mean: item.stock_wine_vintage?.mean ?? 0,
          median: item.stock_wine_vintage?.median ?? 0,
          is_user_investment: true,
        },
        wine_parent: item.wine_parent,
        basket_details: item.basket,
        basket_items: item.basket_items,
      });
      removeFromPortfolio(item.id);
      toast.success(
        "Your wine has been sold successfully! Check it out in the Marketplace under Trending Wines."
      );
      router.push("/vintage/portfolio");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const imgSrc = Array.isArray(item.images) ? item.images[0] : item.images;

  console.log("ITEM IMAGE: ", item);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={item.status !== "In Bond" ? true : false}
        className="w-full"
      >
        <Button
          disabled={item.status !== "In Bond" ? true : false}
          className="bg-red-800 w-full border-2 border-red-800 hover:bg-red-700 text-white"
        >
          Sell
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle>
            Are you sure you want to sell {item.wine_name}
          </DialogTitle>
          <DialogDescription className="flex gap-2 items-center">
            <AlertCircle className="text-orange-500" size={16}></AlertCircle>
            <Label variant="p">
              Note: You're about to add your wine to the marketplace
            </Label>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <Card className="bg-primary-gray-500/50">
              <CardContent className="bg-transparent flex flex-col items-center justify-center">
                <div className="flex flex-col w-full">
                  <div className="flex w-full p-4 items-center justify-center">
                    <Image
                      src={imgSrc}
                      alt=""
                      width={400}
                      height={400}
                      className="h-full w-auto rounded-2xl"
                    ></Image>
                  </div>
                  <div>
                    <Label variant="h2" className="font-thin">
                      {item.case_size}x{bottle_size}cl
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex w-full justify-between">
              <div className="py-2 w-full flex flex-col justify-start">
                <div>
                  <Label className="font-thin">Price</Label>
                </div>
                <div>
                  <Label variant="h2" className="text-green-500">
                    £ {Number(total.toFixed(2)).toLocaleString()}
                  </Label>
                </div>
              </div>
              <div className="py-2 w-full flex flex-col items-end">
                <div>
                  <Label className="font-thin">Investment</Label>
                </div>
                <div>
                  <Label variant="h2" className="text-white">
                    £ {Number(total.toFixed(2)).toLocaleString()}
                  </Label>
                </div>
              </div>
            </div>
            <div>
              <Label>Quantity</Label>
              <div className="flex items-end gap-2">
                <Button
                  disabled={quantity >= 1 ? true : false}
                  className=""
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Minus></Minus>
                </Button>
                <Input
                  placeholder=""
                  type="number"
                  className="text-center"
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuantity(
                      val < 1 ? 1 : val > item.quantity ? item.quantity : val
                    );
                  }}
                  min={1}
                  max={item.quantity}
                />
                <Button
                  disabled={item.quantity === quantity ? true : false}
                  className=""
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus></Plus>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 mt-4 justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="w-25 border hover:text-black"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSell}
              className="w-25 bg-red-700 hover:bg-red-700/50 text-white"
            >
              {loading ? <Spinner></Spinner> : "Sell"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
