"use client";

import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { wineSpecialBundle } from "@/lib/wine_data/special_bundle/index";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DetailsCard from "@/components/marketplace/DetailsCard";
import TabDeatils from "@/components/marketplace/TabDetails";
import { WineImage } from "@/components/marketplace/WineImage";

export default function SpecialBundleDetail() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = ["Overview", "Region", "Grapes"];
  const [activeTab, setActiveTab] = useState("Overview");

  const id = pathname.split("/").pop() || "";
  const data = wineSpecialBundle[id];
  const results = data.results;
  const details = data.basket_details;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto justify-between">
      <div className=" flex">
        <Button variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeft></ChevronLeft>Back
        </Button>
      </div>
      <div className="flex gap-4 min-h-[32%]">
        <Card className="">
          <CardContent className="flex items-center justify-center">
            <Image
              alt=""
              width={400}
              height={400}
              src={details.image}
              className={`h-auto w-[400px] rounded-xl max-w-[600px] transition-all duration-300 object-contain`}
            ></Image>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
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
                <TabDeatils title="Overview" desc={details.winery}></TabDeatils>
              )}
              {activeTab === "Region" && (
                <TabDeatils title="Region" desc={details.region}></TabDeatils>
              )}
              {activeTab === "Grapes" && (
                <TabDeatils title="Grapes" desc={details.grapes}></TabDeatils>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-[58%]">
        <Card className="w-full h-full overflow-x-auto">
          <CardContent className="flex flex-nowrap gap-2 h-full">
            {results.map((item, index) => (
              <Card key={index} className="w-[300px] shrink-0 p-4">
                <CardContent className="flex flex-col items-center justify-between h-full">
                  <Image
                    src={item.wine_images[0]}
                    alt=""
                    width={400}
                    height={400}
                    className="w-60 h-60 object-contain"
                  />
                  <div className="w-full flex flex-col mt-4">
                    <Label variant="h2" className="text-primary-brown">
                      {item.wine_parent_name}
                    </Label>
                    <div className="flex justify-between items-center mt-4">
                      <Label>Quantity:</Label>
                      <Label className="text-white">{item.quantity}</Label>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Bottle Size:</Label>
                      <Label className="text-white">
                        {item.case_size}x{item.basket_bottle_size === "0750"
                          ? 75
                          : item.basket_bottle_size === "1500"
                          ? 150
                          : item.basket_bottle_size === "3000"
                          ? 300
                          : item.basket_bottle_size === "6000"
                          ? 600
                          : 0}cl
                      </Label>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Market Value:</Label>
                      <Label className="text-white">
                        £ {Number(
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
