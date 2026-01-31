"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import React from "react";
import { vintex } from "@/lib/wine_data/vintex";
import { wineVintex } from "@/lib/wine_data/vintex/index";
import { CartItemT, VintexDetailsT } from "@/lib/types";
import { useSubAccount } from "@/context/SubAccountContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function Step4({ id, next }: { id: string; next: () => void }) {
  const { portfolio_builder, updatePortfolioBuilderItem } =
    usePortfolioBuilder();
  const item = portfolio_builder[0];
  const investment = item.investment ?? 0;
  const holding_period = item.holding_period ?? "";
  const region = item.region ?? [];

  const content = [
    {
      label: "Investment Amount",
      value: [`£ ${investment}`],
    },
    {
      label: "Holding Period",
      value: [holding_period],
    },
    {
      label: "Preferred Regions",
      value: region,
    },
  ];

  const handleBuild = () => {
    if (!region?.length || !investment) return;

    const eligibleVintages: {
      wineId: number;
      wineData: any;
      vintage: any;
      price: number;
    }[] = [];

    // 1. Collect eligible vintages
    for (const wine of vintex) {
      const wineData = wineVintex[wine.id];
      if (!wineData?.results?.length) continue;
      if (!region.includes(wine.fromm ?? "")) continue;

      for (const vintage of wineData.results) {
        const price = Number(vintage.market_value);
        if (!price || price > investment) continue;

        eligibleVintages.push({
          wineId: wine.id,
          wineData,
          vintage,
          price,
        });
      }
    }

    if (!eligibleVintages.length) {
      toast(
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-red-600">No wines found</span>
          <span className="text-sm opacity-80">
            Increase your investment or select more regions to see more options
          </span>
        </div>,
        {
          duration: 8000,
          className: "bg-primary-brown text-white",
        },
      );
      return;
    }

    // 2. Shuffle for randomness
    eligibleVintages.sort(() => Math.random() - 0.5);

    // 3. Sort by price ASC (budget packing)
    eligibleVintages.sort((a, b) => a.price - b.price);

    const cartItems: CartItemT[] = [];
    const usedWineIds = new Set<number>();
    let runningTotal = 0;

    // 4. Greedy fill BUT only 1 vintage per wine
    for (const item of eligibleVintages) {
      if (usedWineIds.has(item.wineId)) continue;
      if (runningTotal + item.price > investment) continue;

      usedWineIds.add(item.wineId);
      runningTotal += item.price;

      const { wineData, vintage, price } = item;

      cartItems.push({
        id: `cart-${uuidv4()}`,
        investment_id: 0,
        case_size: wineData.default_vintage.case_size,
        quantity: 1,
        stock_wine_vintage: {
          investment_id: 0,
          case_size: wineData.default_vintage.case_size,
          quantity: 1,
          market_value: price,
          is_owner: false,
          id: vintage.id,
          wine: vintage.wine,
          name: vintage.name,
          lwin11: vintage.lwin11,
          vintage: vintage.vintage,
          rp_score: vintage.rp_score,
          release_price: vintage.release_price,
          rp_released: vintage.rp_released,
          rp_tasting_notes: vintage.rp_tasting_notes,
          rp_reviewer: vintage.rp_reviewer,
          holding_years: vintage.holding_years,
          liv_ex_value: Number(vintage.liv_ex_value),
          is_listed: true,
          oldest_vintage: vintage.oldest_vintage,
          is_very_special: false,
          size: vintage.size,
          status: vintage.status,
          is_unavailable: false,
          get_notified: false,
          available_case_size: vintage.available_case_size,
          drinking_window: vintage.drinking_window,
          tags: vintage.tags,
          processed_case: vintage.processed_case,
          bottle_size: vintage.bottle_size,
          mean: Number(vintage.mean),
          median: Number(vintage.median),
          is_user_investment: false,
        },
        user_investment_wine_vintage: null,
        short_description: vintage.name,
        images: wineData.wine_details.images,
        is_special_volumes: false,
        basket: null,
        basket_items: null,
        wine_parent: wineData.wine_details,
        is_available: true,
        photo_request: false,
        wine_name: wineData.wine_details.name,
        holding_year: vintage.holding_years,
        fromm: wineData.wine_details.fromm,
        purchase_price: price,
        profit_lost: 0,
        profit_lost_by_percent: 0,
        purchase_date: new Date().toISOString(),
        status: "pending",
        sub_account: [],
        location: "",
        bottle_size: vintage.bottle_size,
        vintage: vintage.vintage,
        alcohol_abv: "",
        blend: "",
        grapes: wineData.wine_details.grapes ?? "",
        ownership: "",
        winery: wineData.wine_details.name,
        region: wineData.wine_details.fromm ?? "",
        grape_variety: wineData.wine_details.grapes ?? "",
        rp_tasting_notes: vintage.rp_tasting_notes,
      });

      // stop once close to budget
      if (runningTotal >= investment * 0.95) break;
    }

    updatePortfolioBuilderItem(id, {
      wine_list: cartItems,
    });

    next();
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <Card className="bg-primary-gray-500/50">
        <CardContent className="bg-transparent">
          <div className="rounded-2xl overflow-hidden">
            <Table>
              <TableBody>
                {content.map((item, i) => (
                  <TableRow className="border-primary-brown/30" key={i}>
                    <TableCell>
                      <Label>{item.label}</Label>
                    </TableCell>
                    <TableCell>
                      {item.label === "Preferred Regions" ? (
                        item.value.map((val, idx) => (
                          <Label key={idx} className="font-semibold text-white">
                            {val}
                          </Label>
                        ))
                      ) : (
                        <Label className="font-semibold text-white">
                          {item.value[0]}
                        </Label>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleBuild}>
        Build Portfolio
      </Button>
    </div>
  );
}
