"use client";

import { Dot, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label } from "../ui/label";

export const description = "A donut chart";

const chartData = [
  { browser: "bordeaux", value: 27, fill: "#8D1B22" },
  { browser: "champagne ", value: 20, fill: "#1A6B6F" },
  { browser: "italy", value: 18, fill: "#C4AD93" },
  { browser: "burgundy", value: 13, fill: "#ffff" },
];

const chartConfig = {
  bordeaux: {
    label: "Bordeaux",
    color: "#8D1B22",
  },
  champagne: {
    label: "Champagne",
    color: "#1A6B6F",
  },
  italy: {
    label: "Italy",
    color: "#C4AD93",
  },
  burgundy: {
    label: "Burgundy",
    color: "#ffff",
  },
} satisfies ChartConfig;

export function AssetsByRegion() {
  return (
    <Card className="flex flex-col h-full w-full">
      <CardContent className="rounded-2xl h-full flex flex-col">
        <Label className="text-white" variant="h2">
          Assets by Region
        </Label>
        <div className="flex relative w-full h-full items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="flex absolute left-0 h-full rounded-2xl items-center justify-center"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="browser"
                innerRadius={65}
              />
            </PieChart>
          </ChartContainer>
          <div className="w-full flex flex-col items-end">
            <div className="max-w-70 w-full flex flex-col gap-1">
              {chartData.map((item, index) => (
                <div className="flex items-center gap-4">
                  <div
                    style={{ backgroundColor: `${item.fill}` }}
                    className={`w-2 h-2  rounded-full`}
                  ></div>
                  <div className="flex gap-4 justify-between w-full">
                    <Label className="capitalize">{item.browser}</Label>
                    <Label className="capitalize font-bold text-primary-brown">
                      {item.value}%
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
