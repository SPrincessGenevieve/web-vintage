"use client";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChartPie, Truck } from "lucide-react";

export default function TotalDepositCases() {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col h-full">
        <div className="flex h-full">
          <div className="w-full border-r-2 border-white/30 flex flex-col items-center justify-center">
            <Label variant="h2" className="text-white">
              £ 52, 200
            </Label>
            <Label className="text-white/30">Total Deposit</Label>
          </div>
          <div className="w-full flex-col flex items-center justify-center">
            <Label variant="h2" className="text-white">
              15
            </Label>
            <Label className="text-white/30">Total Cases</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
