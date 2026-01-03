"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { wineSpecialVolume } from "@/lib/wine_data/special-volumes";
import {
  ChevronDown,
  ChevronLeft,
  ShoppingBasket,
  Star,
  WineOff,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DetailsCard from "@/components/marketplace/DetailsCard";
import DrawerBuySpecialVol from "@/components/marketplace/special-volume/DrawerBuy";
import MarketplaceChart from "@/components/marketplace/MarketplaceChart";
import TabDeatils from "@/components/marketplace/TabDetails";
import SpecialVolumeChart from "@/components/marketplace/special-volume/SpecialVolumeChart";

export default function SpecialVolDetail() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() || "";
  const [activeTab, setActiveTab] = useState("Performance");

  const tabs = ["Performance", "Overview", "Region", "Grapes"];
  const data = wineSpecialVolume[id];
  const item = data.results[0];

  const formattedReleasePrice =
    item.release_price && !isNaN(Number(item.release_price))
      ? Number(item.release_price) > 0
        ? `+${item.release_price}%`
        : `${item.release_price}%`
      : "";

  if (!data) {
    return (
      <div className="w-full h-full">
        <Label>Wine data not found for ID: {id}</Label>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className=" flex">
        <Button className="p-0 m-0 px-0 mx-0"  variant={"ghost"} onClick={() => router.push("/vintage/marketplace")}>
          <ChevronLeft></ChevronLeft>Back
        </Button>
      </div>
      <div className="flex gap-4 h-[35%]">
        <Card className="">
          <CardContent>
            <div>
              <Image
                alt=""
                width={400}
                height={400}
                src={data.wine_details.wine_images[0]}
                className={`h-full max-h-[280px] w-[360px] transition-all duration-300 object-contain`}
              ></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <DetailsCard
              name={data.wine_details.name}
              alcohol_abv={data.wine_details.alcohol_abv}
              blend={data.wine_details.blend}
              grapes={data.wine_details.grapes}
              ownership={data.wine_details.ownership}
            ></DetailsCard>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between">
        {tabs.map((item, index) => (
          <div key={index} className="flex w-full">
            <Button
              onClick={() => setActiveTab(item)}
              variant={"ghost"}
              className={`w-full border-b-2 ${
                activeTab === item
                  ? "border-white text-white font-semibold"
                  : "border-primary-brown/30"
              } rounded-none`}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between gap-4">
        <Card className="w-full">
          <CardContent className="flex h-full">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Label
                className={`text-[18px] md:text-lg font-poppins-medium ${
                  Number(item.release_price) > 0
                    ? "text-green-500"
                    : Number(item.release_price) < 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                variant="h1"
              >
                {formattedReleasePrice}
              </Label>
              <Label>Lifetime Performance</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[300px] bg-primary-brown">
          <CardContent className="flex bg-transparent">
            <div className="flex flex-col w-full items-end gap-4">
              <div className="flex justify-end w-full gap-4">
                <div className="flex items-center min-w-28 justify-center gap-2 border-2 border-black rounded-[10px] p-2">
                  <Label className="text-black font-bold">{item.vintage}</Label>
                </div>
                <DrawerBuySpecialVol
                  type={"special-volume"}
                  trigger={
                    <Button className="bg-primary-gray-500 text-primary-brown hover:text-black border-2 border-transparent h-10 hover:border-black">
                      <ShoppingBasket /> Buy this vintage
                    </Button>
                  }
                  parent_data={data}
                  result={item}
                  result_data={data.results}
                  bottle_size={item.bottle_size}
                  default_case_size_list={item.available_case_size}
                ></DrawerBuySpecialVol>
              </div>

              <div className="flex flex-col items-end">
                <Label variant="p" className="text-black">
                  Market Value
                </Label>
                <Label
                  variant="h1"
                  className="text-black text-[25px] font-bold"
                >
                  £{Number(item.market_value).toLocaleString()}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="h-full w-full">
        <CardContent className="h-full overflow-y-auto">
          {activeTab === "Performance" && (
            <SpecialVolumeChart
              release_price={Number(item.release_price)}
              lwin11={item.lwin11}
              lifetime_performance={formattedReleasePrice}
              data={data}
              result={data.results}
            ></SpecialVolumeChart>
          )}
          {activeTab === "Overview" && (
            <TabDeatils
              title="Overflow"
              desc={data.wine_details.winery}
            ></TabDeatils>
          )}
          {activeTab === "Region" && (
            <TabDeatils
              title="Region"
              desc={data.wine_details.region}
            ></TabDeatils>
          )}
          {activeTab === "Grapes" && (
            <TabDeatils
              title="Grapes"
              desc={data.wine_details.grapes}
            ></TabDeatils>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
