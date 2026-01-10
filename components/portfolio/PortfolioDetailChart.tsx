"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { useUserContext } from "@/context/UserContext";
import { VintExCardT, VintexDetailsT, VintexResultsT } from "@/lib/types";
import { Button } from "../ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { data_points } from "@/lib/wine_data/data_points";

interface PortfolioChartT {
  lwin11: string;
  vintage?: number;
  case_size?: number;
  wine_name: string;
  bottle_size: string;
}

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

export default function PortfolioDetailChart({
  lwin11,
  vintage,
  case_size,
  wine_name,
  bottle_size,
}: PortfolioChartT) {
  const { setUserDetails, selected_index_vintage } = useUserContext();
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

  const [selectedFilter, setSelectedFilter] = useState("Max");
  const lwin11Data = data_points.find((item) => item.lwin11 === lwin11)?.data;

  const processedChartData = React.useMemo(() => {
    if (!lwin11Data) return [];

    const currentYear = new Date().getFullYear();
    const now = new Date();

    switch (selectedFilter) {
      case "YTD":
        // Filter monthly data for the current year
        return lwin11Data.monthly
          .filter((d) => new Date(d.date).getFullYear() === currentYear)
          .map((d) => ({ date: d.date, value: parseFloat(d.value) }));

      case "6m":
        // Filter monthly data for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return lwin11Data.monthly
          .filter((d) => new Date(d.date) >= sixMonthsAgo)
          .map((d) => ({ date: d.date, value: parseFloat(d.value) }));

      case "3yrs":
        // Last 3 yearly data points
        return lwin11Data.yearly
          .slice(-3)
          .map((d) => ({ date: d.date, value: parseFloat(d.value) }));

      case "5yrs":
        // Last 5 yearly data points
        return lwin11Data.yearly
          .slice(-5)
          .map((d) => ({ date: d.date, value: parseFloat(d.value) }));

      case "Max":
      default:
        // All yearly data
        return lwin11Data.yearly.map((d) => ({
          date: d.date,
          value: parseFloat(d.value),
        }));
    }
  }, [selectedFilter, lwin11Data]);

  const filterBtn = ["YTD", "6m", "3yrs", "5yrs", "Max"];

  return (
    <div className="p-4 flex flex-col gap-4">
      <Label variant="h1">
        {wine_name}, {vintage}, {case_size}x{bottle}cl
      </Label>
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

      <div className="overflow-x-auto w-full">
        <ChartContainer
          // Reduced height to make it more visible on screen
          className="h-[400px] w-full min-w-[600px]"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={processedChartData}
            // Increased bottom margin to 60 to ensure X-axis text is fully visible
            margin={{ left: 20, right: 20, top: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              // interval="preserveStartEnd" ensures we don't crowd the axis
              interval={selectedFilter === "6m" ? 0 : "preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (selectedFilter === "YTD" || selectedFilter === "6m") {
                  const month = date.toLocaleDateString("en-US", {
                    month: "short",
                  });
                  const year = date.toLocaleDateString("en-US", {
                    year: "2-digit",
                  });
                  return `${month}-${year}`;
                }
                return date.getFullYear().toString();
              }}
            />
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              dx={-10}
              textAnchor="end"
              // 1. tickCount creates the "jumping" pattern (e.g., 5 levels)
              tickCount={7}
              // 2. domain ensures the jumps happen at logical intervals
              domain={["auto", "auto"]}
              tickFormatter={(val) => `£${Math.round(val)}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <defs>
              <linearGradient id="fillvalue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="90%"
                  stopColor="var(--color-value)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillvalue)"
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
