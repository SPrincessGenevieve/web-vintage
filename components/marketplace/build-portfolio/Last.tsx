"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import { ChartPie, ShoppingBasket } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function Last({back} : {back: () => void}) {
  const router = useRouter();
  const { portfolio_builder } = usePortfolioBuilder();
  const totalMarketValue = portfolio_builder
    .flatMap((item) => item.wine_list ?? []) // flatten all wine_list arrays
    .reduce(
      (sum, wine) => sum + (wine.stock_wine_vintage?.market_value ?? 0),
      0,
    );

  const cases = portfolio_builder.map((item) => item.wine_list?.length);

  return (
    <div className="p-4 px-8">
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <ShoppingBasket size={50}></ShoppingBasket>
        <Label variant="h1" className="text-center">
          Wines Added to Basket
        </Label>
        <Label>
          {cases} Cases ( £ {totalMarketValue.toLocaleString()} total ) added to
          Basket
        </Label>
      </div>

      <div className="w-full flex gap-2 py-4">
        <Button className="w-1/2" onClick={() => router.push("/vintage/cart")}>
          <ShoppingBasket></ShoppingBasket> Proceed to Checkout
        </Button>
        <Button onClick={back} className="w-1/2">
          <ChartPie></ChartPie> Build New Portfolio
        </Button>
      </div>
    </div>
  );
}
