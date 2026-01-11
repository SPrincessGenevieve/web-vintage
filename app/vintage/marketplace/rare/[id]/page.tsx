"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ShoppingBasket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DetailsCard from "@/components/marketplace/DetailsCard";
import TabDeatils from "@/components/marketplace/TabDetails";
import DrawerBuyRare from "@/components/marketplace/rare/DrawerRareBuy";
import RareChart from "@/components/marketplace/special-volume/RareChart";
import { useRare } from "@/context/RareContext";
import { WineRareResultsT } from "@/lib/types";
import { usePortfolio } from "@/context/PortfolioContext";
import { v4 as uuidv4 } from "uuid";
import { useSubAccount } from "@/context/SubAccountContext";
import { toast } from "sonner";
import VintexRareDetail from "@/components/marketplace/rare/VIntexRareDetail";
import BundleRareDetail from "@/components/marketplace/rare/BundleRareDetail";
import { generateHoldingYear } from "@/components/marketplace/special-volume/DrawerBuy";

export default function RareDetail() {
  const { rare, removeFromRare } = useRare();
  const { subAccounts } = useSubAccount();
  const { addToPortfolio } = usePortfolio();
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() || "";
  const [activeTab, setActiveTab] = useState("Performance");
  console.log("ID: ", id);

  const tabs = ["Performance", "Overview", "Region", "Grapes"];
  const rareDict = Object.fromEntries(
    rare.map((item) => [String(item.investment_id), item])
  ) as Record<string, WineRareResultsT>;

  const data = rareDict[id];

  // console.log("DATA PARENT: ", )
  const item = data ?? null;

  const release_price = item?.wine_vintage_details?.release_price ?? "";

  const formattedReleasePrice =
    release_price && !isNaN(Number(release_price))
      ? Number(release_price) > 0
        ? `+${release_price}%`
        : `${release_price}%`
      : "";

  useEffect(() => {
    if (!data) {
      toast.warning("Wine no longer exist");
      router.push("/vintage/marketplace"); // ✅ safe in useEffect
    }
  }, [data, router]);

  if (!data) return null; // optional: prevent rendering while redirecting
  const dataType = data.basket_details !== null ? "special-bundle" : "vintex";
  const imgSrc =
    dataType === "vintex"
      ? data.wine_parent?.images?.[0]
      : item.basket_details?.image ?? "";

  const handleRemoveWine = () => {
    try {
      const portfolioId = uuidv4();

      const data =
        item.basket_details !== null ? item.basket_details : item.wine_parent;
      const price = data.market_value ?? 0;

      const purchase_price = price * item.case_size * item.quantity;

      addToPortfolio({
        id: portfolioId,
        case_size: item.case_size,
        quantity: item.quantity,
        stock_wine_vintage:
          item.basket_details === null
            ? {
                investment_id: item.investment_id,
                case_size: item.case_size,
                quantity: item.quantity,
                market_value: item.market_value,
                is_owner: true,
                id: item.wine_vintage_details?.id ?? 0,
                wine: item.wine_vintage_details?.id ?? 0, // ⬅️ FIX
                name: item.wine_vintage_details?.name ?? "", // ⬅️ FIX
                lwin11: item.wine_vintage_details?.lwin11 ?? "",
                vintage: item.wine_vintage_details?.vintage ?? 0,
                rp_score: item.wine_vintage_details?.rp_score ?? "",
                release_price: item.wine_vintage_details?.release_price ?? "",
                rp_released: item.wine_vintage_details?.rp_released ?? "",
                rp_tasting_notes:
                  item.wine_vintage_details?.rp_tasting_notes ?? "",
                rp_reviewer: item.wine_vintage_details?.rp_reviewer ?? "",
                holding_years:
                  generateHoldingYear(String(item.investment_id)) ?? "",
                liv_ex_value: item.wine_vintage_details?.liv_ex_value ?? 0,
                is_listed: true,
                oldest_vintage: 0,
                is_very_special: false,
                size: item.wine_vintage_details?.size ?? "",
                status: item.wine_vintage_details?.status ?? "",
                is_unavailable: false,
                get_notified: false,
                available_case_size: [],
                drinking_window:
                  item.wine_vintage_details?.drinking_window ?? "",
                tags: item.wine_vintage_details?.tags ?? "",
                processed_case: item.wine_vintage_details?.processed_case ?? 0,
                bottle_size: item.wine_vintage_details?.bottle_size ?? "",
                mean: item.wine_vintage_details?.mean ?? 0,
                median: item.wine_vintage_details?.median ?? 0,
                is_user_investment: true,
              }
            : null,
        user_investment_wine_vintage: null,
        short_description: "",
        images: imgSrc,
        is_special_volumes: false,
        basket:
          item.basket_details !== null
            ? {
                id: item.basket_details?.id,
                name: item.basket_details.name,
                vintage: null,
                quantity: item.quantity,
                market_value: item.market_value,
                case_size: item.case_size,
                winery: item.basket_details.winery,
                region: item.basket_details.region,
                grapes: item.basket_details.grapes,
                grape_variety: item.basket_details.grape_variety,
                fromm: item.basket_details.fromm,
                image: imgSrc,
                special_id: null,
                is_assortment: false,
                sub_header: "",
                bottle_size: item?.basket_items?.[0].basket_bottle_size ?? "",
              }
            : null,
        basket_items: item.basket_items !== null ? item.basket_items : null,
        is_available: true,
        photo_request: false,
        wine_name: data.name ?? "",
        fromm: data.fromm,
        purchase_date: "",
        purchase_price: purchase_price,
        status: "In Bonding",
        sub_account: subAccounts[0],
        bottle_size:
          item.basket_details !== null
            ? item?.basket_items?.[0].basket_bottle_size ?? ""
            : item.wine_vintage_details?.bottle_size ?? "",

        location: "Portfolio",
        alcohol_abv: item.wine_parent.alcohol_abv ?? "",
        blend: item.wine_parent.blend ?? "",
        grapes: item.wine_parent.grapes ?? "",
        ownership: item.wine_parent.ownership ?? "",
        winery: item.wine_parent.winery ?? "",
        region: item.wine_parent.region ?? "",
        grape_variety: item.wine_parent.grape_variety ?? "",
        rp_tasting_notes:
          item.basket_details === null
            ? ""
            : item.wine_vintage_details?.rp_tasting_notes ?? "",
        wine_parent: item.wine_parent,
        vintage:
          item.basket_details === null
            ? item.wine_vintage_details?.vintage ?? 0
            : 0,
        holding_year: generateHoldingYear(String(item.investment_id)) ?? "",
      });
      toast.success("Wine has been removed from the marketplace.");
      router.push("/vintage/marketplace");
      removeFromRare(item.investment_id);
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className=" flex w-full justify-between items-center">
        <div>
          <Button
            className="p-0 m-0 px-0 mx-0"
            variant={"ghost"}
            onClick={() => router.push("/vintage/marketplace")}
          >
            <ChevronLeft></ChevronLeft>Back
          </Button>
        </div>
        {item.is_owner && (
          <div>
            <Button
              onClick={handleRemoveWine}
              className="bg-red-700 hover:bg-red-700/50 text-white"
            >
              Remove from Marketplace
            </Button>
          </div>
        )}
      </div>
      {data.basket_details === null ? (
        <VintexRareDetail
          item={item}
          data={data}
          dataType={dataType}
        ></VintexRareDetail>
      ) : (
        <BundleRareDetail
          market_value={data.basket_details?.market_value}
          item={item}
          dataType={dataType}
          data={data}
        ></BundleRareDetail>
      )}
    </div>
  );
}
