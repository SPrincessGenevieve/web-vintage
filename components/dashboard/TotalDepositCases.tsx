"use client";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChartPie, Truck } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { usePortfolio } from "@/context/PortfolioContext";
import { useWineCellar } from "@/context/WineCellarContext";
import { useActivities } from "@/context/ActivitiesContext";

export default function TotalDepositCases() {
  const { account_bal } = useUserContext();
  const { portfolio } = usePortfolio();
  const { wineCellar } = useWineCellar();
  const { activities } = useActivities();
  const case_count_port = portfolio.length;
  const case_count_cellar = wineCellar.length;
  const deposit = activities.filter((item) => item.action === "Deposit");
  const deposit_total = deposit.reduce((total, item) => {
    return total + Number(item.depost_detail?.deposit_amount || 0);
  }, 0);
  const case_count = case_count_cellar + case_count_port;

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col h-full">
        <div className="flex h-full">
          <div className="w-full border-r-2 border-white/30 flex flex-col items-center justify-center">
            <Label variant="h2" className="text-white">
              £ {deposit_total.toLocaleString()}
            </Label>
            <Label className="text-white/30">Total Deposit</Label>
          </div>
          <div className="w-full flex-col flex items-center justify-center">
            <Label variant="h2" className="text-white">
              {case_count}
            </Label>
            <Label className="text-white/30">Total Cases</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
