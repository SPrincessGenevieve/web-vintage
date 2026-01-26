"use client";

import React, { useEffect, useMemo, useState } from "react";
import { indicies_list } from "@/lib/indicies/indicies";
import { IndiciesT } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomTooltip } from "@/components/CustomTooltip";
import { Brush, X } from "lucide-react";

const colors = [
  "#f87171",
  "#60a5fa",
  "#16a34a",
  "#facc15",
  "#a855f7",
  "#f472b6",
  "#4f46e5",
  "#14b8a6",
  "#f97316",
  "#06b6d4",
  "#a3e635",
  "#ff007f",
  "#ee82ee",
  "#ff00ff",
  "#50c878",
  "#87ceeb",
  "#ffbf00",
];

const PERCENTAGE_INDICES = ["FTSE 100", "S&P 500", "SPDR Gold Shares"];
const RATE_INDICES = ["Inflation Rate", "Interest Rate"];

const timeList = ["YTD", "6m", "3yrs", "5yrs", "Max"];

export default function Indicies() {
  const [data, setData] = useState<IndiciesT[]>([]);
  const [indexFilter, setIndexFilter] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<IndiciesT[]>([]);
  const [timeFilter, setTimeFilter] = useState("YTD");

  // Load data
  useEffect(() => {
    setData(indicies_list);
  }, []);

  // Filter data
  useEffect(() => {
    setFilteredData(data.filter((item) => indexFilter.includes(item.name)));
  }, [indexFilter, data]);

  const usePercentage = filteredData.some(
    (item) =>
      PERCENTAGE_INDICES.includes(item.name) ||
      RATE_INDICES.includes(item.name),
  );

  // ✅ Stable color per index (ORDER MATTERS — MUST BE HERE)
  const indexColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    data.forEach((item, i) => {
      map[item.name] = colors[i % colors.length];
    });
    return map;
  }, [data]);

  // Chart config
  const chartConfig: ChartConfig = {};
  filteredData.forEach((item) => {
    chartConfig[item.name] = {
      label: item.name,
      color: indexColorMap[item.name],
    };
  });

  // Build chart data
  const chartData = useMemo(() => {
    if (!filteredData.length) return [];

    const isMonthly = timeFilter === "YTD" || timeFilter === "6m";
    const dataKey: "monthly" | "yearly" = isMonthly ? "monthly" : "yearly";

    let limit = Infinity;
    if (timeFilter === "YTD") limit = 12; // ✅ last 1 year
    if (timeFilter === "6m") limit = 6;
    if (timeFilter === "3yrs") limit = 3;
    if (timeFilter === "5yrs") limit = 5;

    const normalizeMonth = (date: string) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    };

    const allDates = Array.from(
      new Set(
        filteredData.flatMap((item) =>
          item.chart_data[dataKey].map((d) =>
            dataKey === "monthly" ? normalizeMonth(d.date) : d.date,
          ),
        ),
      ),
    ).sort();

    const selectedDates = allDates.slice(-limit);

    return selectedDates.map((date) => {
      const row: Record<string, number | string | null> = {
        date,
        label:
          dataKey === "monthly"
            ? (() => {
                const [y, m] = date.split("-");
                return `${new Date(Number(y), Number(m) - 1).toLocaleString(
                  "default",
                  {
                    month: "short",
                  },
                )}-${y}`;
              })()
            : date,
      };

      filteredData.forEach((item) => {
        const point = item.chart_data[dataKey].find((d) => {
          const key = dataKey === "monthly" ? normalizeMonth(d.date) : d.date;
          return key === date;
        });

        if (!point) {
          row[item.name] = 0;
        } else if (RATE_INDICES.includes(item.name)) {
          // 🔥 Already a percentage — use raw value
          row[item.name] = Number(point.value);
        } else if (usePercentage) {
          // % performance indices
          const firstValue = Number(item.chart_data[dataKey][0]?.value);
          const currentValue = Number(point.value);

          row[item.name] =
            firstValue && firstValue !== 0
              ? ((currentValue - firstValue) / firstValue) * 100
              : 0;
        } else {
          row[item.name] = Number(point.value);
        }
      });

      return row;
    });
  }, [filteredData, timeFilter]);

  // Y-axis calculation (exactly 7 ticks)
  const allValues = chartData.flatMap((row) =>
    filteredData
      .map((item) => row[item.name])
      .filter((v): v is number => typeof v === "number"),
  );

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const TICK_COUNT = 7;
  const range = max - min || 1;
  const step = range / (TICK_COUNT - 1);
  const roundTo = Math.pow(10, Math.floor(Math.log10(step)));
  const niceStep = Math.ceil(step / roundTo) * roundTo;

  const yAxisMin = Math.floor(min / niceStep) * niceStep;
  const ticks = Array.from(
    { length: TICK_COUNT },
    (_, i) => yAxisMin + i * niceStep,
  );

  const category = ["Indicies", "Key UK Rates"];
  const [selectedCategory, setSelectedCategory] = useState<
    "Indicies" | "Key UK Rates"
  >("Indicies");

  const header = ["Index", "Current", "MoM"];

  const visibleIndices = useMemo(() => {
    if (selectedCategory === "Key UK Rates") {
      return data.filter(
        (item) =>
          item.name === "Inflation Rate" || item.name === "Interest Rate",
      );
    }

    // Indicies
    return data.filter(
      (item) => item.name !== "Inflation Rate" && item.name !== "Interest Rate",
    );
  }, [data, selectedCategory]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Sheet>
        <SheetTrigger className="sheet-chart hidden">
          <Button>Filter</Button>
        </SheetTrigger>
        <SheetContent className="p-4">
          <div>
            <CardTitle className="flex justify-between">
              <Label className="font-semibold text-white">Market Data</Label>
            </CardTitle>
            <div className="flex flex-col justify-between gap-2 mt-2 ml-4">
              {category.map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <Checkbox
                    id={item}
                    checked={selectedCategory === item}
                    onCheckedChange={() => {
                      setSelectedCategory(item as "Indicies" | "Key UK Rates");
                      setIndexFilter([]); // 🔥 reset selections when switching category
                    }}
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <CardTitle className="flex justify-between">
              <Label className="font-semibold text-white">
                Index Filter ({filteredData.length}/5)
              </Label>
              <div className="h-8">
                {filteredData.length !== 0 && (
                  <Button
                    onClick={() => setIndexFilter([])}
                    variant="ghost"
                    disabled={indexFilter.length === 0}
                    className="text-red-600"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardTitle>
            <div className="flex flex-col gap-2 p-4">
              {visibleIndices.map((item) => (
                <div key={item.name} className="flex gap-2 items-start">
                  <Checkbox
                    id={item.name}
                    checked={indexFilter.includes(item.name)}
                    onCheckedChange={(checked) => {
                      setIndexFilter((prev) => {
                        if (checked) {
                          // Only add if under 5
                          if (prev.length < 5) {
                            return [...prev, item.name];
                          } else {
                            return prev; // ignore if already 5
                          }
                        } else {
                          // Remove when unchecked
                          return prev.filter((i) => i !== item.name);
                        }
                      });
                    }}
                  />
                  <Label
                    htmlFor={item.name}
                    className={
                      indexFilter.includes(item.name)
                        ? "text-white"
                        : "text-white/30"
                    }
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex gap-2 h-full w-full max-h-[65vh]">
        <Card className="h-full card-filter-cont">
          <CardContent className="min-w-[300px] h-full">
            <div>
              <CardTitle className="flex justify-between">
                <Label className="font-semibold text-white">Market Data</Label>
              </CardTitle>
              <div className="flex flex-col justify-between gap-2 mt-2 ml-4">
                {category.map((item) => (
                  <div key={item} className="flex gap-2 items-start">
                    <Checkbox
                      id={item}
                      checked={selectedCategory === item}
                      onCheckedChange={() => {
                        setSelectedCategory(
                          item as "Indicies" | "Key UK Rates",
                        );
                        setIndexFilter([]); // 🔥 reset selections when switching category
                      }}
                    />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CardTitle className="flex justify-between">
                <Label className="font-semibold text-white">
                  Index Filter ({filteredData.length}/5)
                </Label>
                <div className="h-8">
                  {filteredData.length !== 0 && (
                    <Button
                      onClick={() => setIndexFilter([])}
                      variant="ghost"
                      disabled={indexFilter.length === 0}
                      className="text-red-600"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </CardTitle>
              <div className="flex flex-col gap-2 p-4">
                {visibleIndices.map((item) => (
                  <div key={item.name} className="flex gap-2 items-start">
                    <Checkbox
                      id={item.name}
                      checked={indexFilter.includes(item.name)}
                      onCheckedChange={(checked) => {
                        setIndexFilter((prev) => {
                          if (checked) {
                            // Only add if under 5
                            if (prev.length < 5) {
                              return [...prev, item.name];
                            } else {
                              return prev; // ignore if already 5
                            }
                          } else {
                            // Remove when unchecked
                            return prev.filter((i) => i !== item.name);
                          }
                        });
                      }}
                    />
                    <Label
                      htmlFor={item.name}
                      className={
                        indexFilter.includes(item.name)
                          ? "text-white"
                          : "text-white/30"
                      }
                    >
                      {item.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="px-2 w-full h-full flex flex-col gap-4">
          <div className="flex gap-2 w-full h-[10%]">
            {timeList.map((item) => (
              <Button
                key={item}
                variant={item === timeFilter ? "default" : "outline"}
                className="w-[60px] rounded-full"
                onClick={() => setTimeFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          {filteredData.length === 0 ? (
            <Card className="w-full h-full mt-2 bg-transparent">
              <CardContent className="bg-transparent w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                  <Label>Select an Index Filter to display the chart.</Label>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card
              className={`w-full my-4 h-full max-h-[90%] overflow-x-auto bg-primary-gray-600`}
            >
              <CardContent className="w-full h-full items-center justify-center min-w-[700px]  bg-transparent ">
                <div className="w-full h-full">
                  <ChartContainer
                    config={chartConfig}
                    className="w-full flex h-full"
                  >
                    <ResponsiveContainer
                      className={"w-full h-full flex rounded-2xl"}
                    >
                      <AreaChart
                        data={chartData}
                        className="h-full w-full flex"
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" />
                        <YAxis
                          ticks={ticks}
                          tickFormatter={(v) =>
                            usePercentage ? `${Number(v).toFixed(1)}%` : v
                          }
                          domain={[ticks[0], ticks[ticks.length - 1]]}
                        />
                        <Tooltip
                          content={
                            <CustomTooltip usePercentage={usePercentage} />
                          }
                          cursor={{ strokeDasharray: "3 3" }}
                        />
                        {filteredData.map((item) => (
                          <Area
                            connectNulls
                            key={item.name}
                            type="monotone"
                            dataKey={item.name}
                            stroke={indexColorMap[item.name]}
                            fill="none"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <Label className="text-white" variant="h2">
          Index Table
        </Label>
        <div className="rounded-2xl overflow-hidden h-full w-full flex">
          {filteredData.length === 0 ? (
            <Card className="w-full h-full bg-primary-gray-600">
              <CardContent className="h-full flex items-center justify-center bg-transparent">
                <Label className="text-center">
                  No data to display. Please select at least one index to view
                  the table.
                </Label>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-primary-brown">
                  {header.map((item, index) => (
                    <TableCell key={index}>
                      <Label className="text-black font-semibold">{item}</Label>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow className="border-primary-brown/30">
                    <TableCell className="index-name-cont">
                      <div className="flex items-center gap-4">
                        <div>
                          <div
                            style={{
                              backgroundColor: indexColorMap[item.name],
                            }}
                            className={`w-4 h-4 rounded-[5px]`}
                          ></div>
                        </div>
                        <Label className="whitespace-normal ">
                          {item.name}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Label>
                        £ {Number(item.current_value).toLocaleString()}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label>
                        {Number(Number(item.mom) * 100).toFixed(0)}%
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
