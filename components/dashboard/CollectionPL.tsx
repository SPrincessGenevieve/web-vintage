"use client";
import React from "react";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { user_data } from "@/lib/wine_data/user";
import { useRouter } from "next/navigation";
import DepositDialog from "../DepositDialog";
import { usePortfolio } from "@/context/PortfolioContext";
import { useActivities } from "@/context/ActivitiesContext";

export default function CollectionPL() {
  const router = useRouter();
  const item = user_data.data;
  const { portfolio } = usePortfolio();
  const { activities } = useActivities();
  const deposit = activities.filter((item) => item.action === "Deposit");
  const deposit_total = deposit.reduce((total, item) => {
    return total + Number(item.depost_detail?.deposit_amount || 0);
  }, 0);

  const topPortfolio = portfolio.reduce(
    (max, current) => {
      if (!max) return current;

      return (current.profit_lost ?? 0) > (max.profit_lost ?? 0)
        ? current
        : max;
    },
    null as (typeof portfolio)[number] | null,
  );
  const port = topPortfolio?.profit_lost ?? 0;
  const port_per = topPortfolio?.profit_lost_by_percent ?? 0;
  const mark =
    topPortfolio?.stock_wine_vintage?.market_value ??
    topPortfolio?.basket?.market_value ??
    0;

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
                £ {Number(Number(mark ?? 0).toFixed(2)).toLocaleString()}
              </Label>
            </div>

            <div className="">
              <Label variant="p" className="">
                P&L
              </Label>
              <div className="flex gap-2">
                <Label
                  variant="h1"
                  className={`font-semibold ${port < 0 ? "text-red-600" : "text-green-600"}`}
                >
                  £ {Number(port.toFixed(2)).toLocaleString()}
                </Label>
                <div className="flex">
                  <Label
                    variant="h2"
                    className={`font-semibold rounded-sm px-1  ${port_per < 0 ? "bg-red-800" : "bg-green-800"} text-white`}
                  >
                    {Number(port_per.toFixed(2)).toLocaleString()}%
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
                {Number(deposit_total || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Label>
            </div>
            <DepositDialog></DepositDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
