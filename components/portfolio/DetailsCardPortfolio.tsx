import React from "react";
import { Label } from "../ui/label";
import { holding_time } from "@/lib/selection";

interface DetailCardT {
  name: string;
  quantity: number;
  purchase_price: number;
  profit_loss: number;
  profit_loss_percent: string;
  purchase_date: string;
  status: string;
  holding_years: string;
}

export default function DetailsCardPortfolio({
  name,
  quantity,
  purchase_price,
  profit_loss,
  profit_loss_percent,
  status,
  purchase_date,
  holding_years,
}: DetailCardT) {
  return (
    <div>
      <Label variant="h1" className="text-primary-brown">
        {name}
      </Label>
      <div className="mt-4 flex flex-col gap-4">
        <div className="border-b pb-4 border-primary-brown/30 flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Profit Loss
            </Label>
            <div className="flex mt-2">
              <Label
                variant="h2"
                className={`px-1 rounded-[5px] ${
                  profit_loss > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                £ {Number(profit_loss.toFixed(2)).toLocaleString()}
              </Label>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Profit Loss (%)
            </Label>
            <div className="flex mt-2">
              <Label
                variant="h2"
                className={`text-white px-1 rounded-[5px] ${
                  profit_loss > 0 ? "bg-green-500/30" : "bg-red-500/50"
                }`}
              >
                {profit_loss_percent}%
              </Label>
            </div>
          </div>
        </div>
        <div className="border-b pb-4 border-primary-brown/30 flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Purchase Price
            </Label>
            <Label variant="h2" className="text-primary-brown">
              £ {Number(purchase_price.toFixed(2)).toLocaleString()}
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Quantity
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {quantity}
            </Label>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Holding
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {holding_years} Year/s
            </Label>
          </div>
          <div className="w-1/2 flex flex-col">
            <Label variant="p" className="text-white/50">
              Status
            </Label>
            <Label variant="h2" className="text-primary-brown">
              {status === "NA" ? "--" : status}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
