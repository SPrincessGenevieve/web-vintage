"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItemT, PortfolioT } from "@/lib/types";
import { AlertCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export default function GiftDialog({
  data,
  close,
  gift,
}: {
  data: CartItemT;
  close: () => void;
  gift: () => void;
}) {
  const [quantity, setQuantity] = useState(data.quantity);
  const bottle_size =
    data.bottle_size === "0750"
      ? 75
      : data.bottle_size === "1500"
      ? 150
      : data.bottle_size === "3000"
      ? 300
      : data.bottle_size === "6000"
      ? 600
      : 0;
  const total =
    Number(data.stock_wine_vintage?.market_value) *
    data.case_size *
    data.quantity;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label variant="h1">Are you sure you want to Gift this wine?</Label>
        <div className="flex gap-2 items-start">
          <AlertCircle className="text-orange-600"></AlertCircle>
          <Label>
            Note: if the account doesn’t exist yet - we will send them an email
            invitation for account creation.
          </Label>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <Card className="bg-primary-gray-500/50">
            <CardContent className="bg-transparent flex flex-col items-center justify-center">
              <div className="flex flex-col w-full">
                <div className="flex w-full p-4 items-center justify-center">
                  <Image
                    src={data.images[0]}
                    alt=""
                    width={400}
                    height={400}
                    className="h-40 w-auto"
                  ></Image>
                </div>
                <div>
                  <Label variant="h2" className="font-thin">
                    {data.case_size}x{bottle_size}cl
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
                <Label variant="h2" className="text-green-500">
                  £ {Number(total.toFixed(2)).toLocaleString()}
                </Label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Input placeholder="example@gmail.com" label="Email"></Input>
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
                      val < 1 ? 1 : val > data.quantity ? data.quantity : val
                    );
                  }}
                  min={1}
                  max={data.quantity}
                />
                <Button
                  disabled={data.quantity === quantity ? true : false}
                  className=""
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus></Plus>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 justify-end mt-4">
        <Button onClick={close} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={gift}>Gift</Button>
      </div>
    </div>
  );
}
