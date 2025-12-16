"use client";
import React from "react";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { user_data } from "@/lib/wine_data/user";
import { useRouter } from "next/navigation";

export default function CollectionPL() {
  const router = useRouter();
  const item = user_data.data;

  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <div className="flex flex-col">
          <div className="w-full flex justify-between border-b border-white/30 pb-2">
            <div className="">
              <Label variant="p" className="">
                Collection Value
              </Label>
              <Label variant="h1" className="font-semibold">
                £{" "}
                {Number(item.current_market_value.toFixed(2)).toLocaleString()}
              </Label>
            </div>

            <div className="">
              <Label variant="p" className="">
                P&L
              </Label>
              <div className="flex gap-2">
                <Label variant="h1" className="font-semibold text-green-600">
                  £{" "}
                  {Number(
                    item.unrealised_profit_loss_money.toFixed(2)
                  ).toLocaleString()}
                </Label>
                <div className="flex">
                  <Label
                    variant="h2"
                    className="font-semibold rounded-sm px-1 bg-green-800 text-white"
                  >
                    {Number(item.profit_loss.toFixed(2)).toLocaleString()}%
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between py-2">
            <div className="flex gap-2">
              <Label className="text-white/30">Balance:</Label>
              <Label className="text-white">
                £{" "}
                {Number(item.balance || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Label>
            </div>
            <Button
              onClick={() => router.push("/vintage/settings/deposit")}
              variant={"outline"}
            >
              <Plus></Plus>Deposit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
