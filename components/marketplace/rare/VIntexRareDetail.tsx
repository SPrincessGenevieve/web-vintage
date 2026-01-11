"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WineRareResultsT } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import DetailsCard from "../DetailsCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DrawerBuyRare from "./DrawerRareBuy";
import { ShoppingBasket } from "lucide-react";
import RareChart from "../special-volume/RareChart";
import TabDeatils from "../TabDetails";

export default function VintexRareDetail({
  data,
  item,
  dataType,
}: {
  data: WineRareResultsT;
  item: WineRareResultsT;
  dataType: string;
}) {
  const tabs = ["Performance", "Overview", "Region", "Grapes"];
  const [activeTab, setActiveTab] = useState("Performance");
  const release_price = item?.wine_vintage_details?.release_price ?? "";
  console.log("DATA: ", item)
  const formattedReleasePrice =
    release_price && !isNaN(Number(release_price))
      ? Number(release_price) > 0
        ? `+${release_price}%`
        : `${release_price}%`
      : "";

  const imgSrc = item.wine_parent.images[0]
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 h-[35%]">
        <Card className="">
          <CardContent>
            <div>
              <Image
                alt=""
                width={400}
                height={400}
                src={imgSrc ?? "/placeholder.png"}
                className={`h-full max-h-[280px] w-[360px] transition-all duration-300 object-contain`}
              ></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <DetailsCard
              name={
                item.basket_details === null
                  ? item.wine_parent?.name ?? ""
                  : item.basket_details?.name ?? ""
              }
              alcohol_abv={
                item.basket_details === null
                  ? item.wine_parent?.alcohol_abv ?? ""
                  : "0.00%"
              }
              blend={
                item.basket_details === null
                  ? item.wine_parent?.blend ?? ""
                  : "---"
              }
              grapes={
                item.basket_details === null
                  ? item.wine_parent?.grapes ?? ""
                  : item.wine_parent.grapes ?? ""
              }
              ownership={
                item.basket_details === null
                  ? item.wine_parent?.ownership ?? ""
                  : "---"
              }
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
                  Number(item.wine_vintage_details?.release_price) > 0
                    ? "text-green-500"
                    : Number(item.wine_vintage_details?.release_price) < 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                variant="h1"
              >
                {formattedReleasePrice || "---"}
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
                  <Label className="text-black font-bold">
                    {item.basket_details === null
                      ? item.wine_vintage_details?.vintage
                      : "---"}
                  </Label>
                </div>
                <DrawerBuyRare
                  type="rare"
                  trigger={
                    <Button className="bg-primary-gray-500 text-primary-brown hover:text-black border-2 border-transparent h-10 hover:border-black">
                      <ShoppingBasket /> Buy this vintage
                    </Button>
                  }
                  result={item}
                ></DrawerBuyRare>
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
            <RareChart
              release_price={Number(item.wine_vintage_details?.release_price)}
              lwin11={
                item.basket_details
                  ? ""
                  : item.wine_vintage_details?.lwin11 ?? ""
              }
              lifetime_performance={formattedReleasePrice}
              data={item}
            ></RareChart>
          )}
          {activeTab === "Overview" && (
            <TabDeatils
              title="Overflow"
              desc={
                item.basket_details === null
                  ? item.wine_parent?.winery ?? ""
                  : item.basket_details?.winery ?? ""
              }
            ></TabDeatils>
          )}
          {activeTab === "Region" && (
            <TabDeatils
              title="Region"
              desc={
                item.basket_details === null
                  ? item.wine_parent?.region ?? ""
                  : item.basket_details?.region ?? ""
              }
            ></TabDeatils>
          )}
          {activeTab === "Grapes" && (
            <TabDeatils
              title="Grapes"
              desc={
                item.basket_details === null
                  ? item.wine_parent?.grape_variety ?? ""
                  : item.basket_details?.grape_variety ?? ""
              }
            ></TabDeatils>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
