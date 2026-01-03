"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Item } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label as Text } from "./ui/label";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", value: 80 },
  { month: "February", value: 200 },
  { month: "March", value: 120 },
  { month: "April", value: 190 },
  { month: "May", value: 130 },
  { month: "June", value: 140 },
];

const chartConfig = {
  value: {
    label: "value",
    color: "var(--color-primary-brown)",
  },
} satisfies ChartConfig;

export function PortfolioChart() {
  const [selectedFilter, setSelectedFilter] = useState("Max");

  const filterBtn = ["YTD", "6m", "3yrs", "5yrs", "Max"];

  return (
    <Card className="h-full w-full pb-2">
      <CardContent className="w-full rounded-2xl pb-0 py-0 my-0  h-full justify-between flex flex-col">
        <Text variant="h2">Portfolio Value</Text>
        <div className="flex w-full bg-black/20 p-2 mb-4 rounded-2xl">
          {filterBtn.map((item, index) => (
            <Button
              key={index}
              variant={selectedFilter === item ? "default" : "ghost"}
              onClick={() => setSelectedFilter(item)}
              className="w-[20%] h-7"
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="overflow-y-auto max-w-screen">
          <ChartContainer
            className="portfolio-dash-chart w-full h-[20vh]"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="value"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillvalue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="value"
                type="natural"
                fill="url(#fillvalue)"
                fillOpacity={0.4}
                stroke="var(--color-value)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
