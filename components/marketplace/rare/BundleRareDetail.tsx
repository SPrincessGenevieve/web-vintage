"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import TabDeatils from "../TabDetails";
import BuyBundleBtn from "@/components/BuyBundleBtn";
import { useRouter } from "next/navigation";
import { WineRareResultsT } from "@/lib/types";
import BuyBundleBtnRare from "./BuyBundleBtnRare";

export default function BundleRareDetail({
  item,
  data,
  dataType,
  market_value,
}: {
  item: WineRareResultsT;
  data: WineRareResultsT;
  dataType: string;
  market_value: number;
}) {
  const router = useRouter();
    const tabs = ["Overview", "Region", "Grapes"];
    const [activeTab, setActiveTab] = useState("Overview");

  const imgSrc =
    dataType === "vintex"
      ? data.wine_parent?.images?.[0]
      : item.basket_details?.image ?? "";

const bundle_parent_data = item.basket_details
const bundle_items_data = item.basket_items ?? []

console.log("")

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto justify-between">
      <div className="flex gap-4 min-h-[32%]">
        <Card className="">
          <CardContent className="flex h-full items-center justify-center">
            <Image
              alt=""
              width={400}
              height={400}
              src={imgSrc}
              className={`h-full w-auto rounded-xl max-w-[600px] transition-all duration-300 object-contain`}
            ></Image>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <Label
              variant="h1"
              className="text-primary-brown pb-2 w-full border-b-2 border-primary-brown/30"
            >
              {bundle_parent_data?.name ?? ""}
            </Label>
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
            <div className="h-full">
              {activeTab === "Overview" && (
                <TabDeatils title="Overview" desc={bundle_parent_data?.winery ?? ""}></TabDeatils>
              )}
              {activeTab === "Region" && (
                <TabDeatils title="Region" desc={bundle_parent_data?.region ?? ""}></TabDeatils>
              )}
              {activeTab === "Grapes" && (
                <TabDeatils title="Grapes" desc={bundle_parent_data?.grapes ?? ""}></TabDeatils>
              )}
            </div>
          </CardContent>
        </Card>
        <BuyBundleBtnRare market_value={market_value} data={data}></BuyBundleBtnRare>
      </div>
      <div className="w-full h-[58%]">
        <Card className="w-full h-full overflow-x-auto">
          <CardContent className="flex flex-nowrap gap-2 h-full">
            {bundle_items_data.map((item, index) => (
              <Card
                onClick={() =>
                  router.push(
                    `/vintage/marketplace/vint-ex/${item.wine_parent_id}/${item.wine_vintage.id}/${item.wine_vintage.vintage}`
                  )
                }
                key={index}
                className="w-[300px] shrink-0 p-4 hover:bg-primary-gray-500/50 transition ease-in-out"
              >
                <CardContent className="flex flex-col items-center bg-transparent justify-between h-full">
                  <Image
                    src={item.images[0]}
                    alt=""
                    width={400}
                    height={400}
                    className="w-60 h-60 object-contain"
                  />
                  <div className="w-full flex flex-col mt-4">
                    <Label variant="h2" className="text-primary-brown">
                      {item?.wine_vintage.name ?? ""}
                    </Label>
                    <div className="flex justify-between items-center mt-4">
                      <Label>Quantity:</Label>
                      <Label className="text-white">{item.quantity}</Label>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Bottle Size:</Label>
                      <Label className="text-white">
                        {item.case_size}x
                        {item.basket_bottle_size === "0750"
                          ? 75
                          : item.basket_bottle_size === "1500"
                          ? 150
                          : item.basket_bottle_size === "3000"
                          ? 300
                          : item.basket_bottle_size === "6000"
                          ? 600
                          : 0}
                        cl
                      </Label>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Market Value:</Label>
                      <Label className="text-white">
                        £{" "}
                        {Number(
                          item.wine_vintage.market_value
                        ).toLocaleString()}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
