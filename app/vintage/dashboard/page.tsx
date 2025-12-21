"use client";

import { AssetsByRegion } from "@/components/dashboard/AssetsByRegion";
import CollectionPL from "@/components/dashboard/CollectionPL";
import DeliveryHistoryTable from "@/components/dashboard/DeliveryHistoryTable";
import TopWines from "@/components/dashboard/TopWines";
import TotalDepositCases from "@/components/dashboard/TotalDepositCases";
import { PortfolioChart } from "@/components/PortfolioChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  return (
    <div className="flex h-full gap-4 dashboard-main-cont">
      <div className="w-full h-full flex flex-col gap-4">
        <div className="h-[16%] min-h-30">
          <CollectionPL></CollectionPL>
        </div>
        <div className="h-[10%]">
          <TotalDepositCases></TotalDepositCases>
        </div>
        <div className="h-[37%] min-h-70">
          <PortfolioChart></PortfolioChart>
        </div>
        <div className="h-[37%] min-h-70">
          <AssetsByRegion></AssetsByRegion>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="h-[63%]">
          <TopWines></TopWines>
        </div>
        <div className="h-[37%] min-h-70">
          <DeliveryHistoryTable></DeliveryHistoryTable>
        </div>
      </div>
    </div>
  );
}
