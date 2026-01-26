"use client";

import { Label } from "@/components/ui/label";
import { useParams, usePathname } from "next/navigation";
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
import BuyBundleBtn from "@/components/BuyBundleBtn";
import { CartItemT, SpecialBundleT } from "@/lib/types";
import BuyBundlePortfolioBtn from "./BuyBundlePortfolioBtn";
import MoreContentPortfolio from "./MoreContentPortfolio";
import MoreContentPortfolioBundle from "./MoreContentPortfolioBundle";
import { useActivities } from "@/context/ActivitiesContext";

export default function PortfolioDetailBasket({ item }: { item: CartItemT }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const tabs = ["Overview", "Region", "Grapes"];
  const [activeTab, setActiveTab] = useState("Overview");
  const imgSrc = Array.isArray(item.images) ? item.images[0] : item.images;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto justify-between">
      <div className=" flex relative justify-between w-full">
        <Button
          className="p-0 m-0 px-0 mx-0"
          variant={"ghost"}
          onClick={() => router.push("/vintage/portfolio")}
        >
          <ChevronLeft></ChevronLeft>Back
        </Button>
      </div>
      <div className="flex gap-4 min-h-[32%] bundle-l1">
        <Card className="px-2">
          <CardContent className="flex bg-black h-full items-center justify-center">
            <Image
              alt=""
              width={400}
              height={400}
              src={imgSrc}
              className={`h-full max-h-52 w-auto rounded-xl max-w-[600px] transition-all duration-300 object-contain`}
            ></Image>
          </CardContent>
        </Card>
        <div className="bundle-l1-l1 flex gap-4">
          <Card className="w-full">
            <CardContent className="relative p-4 flex justify-between h-full">
              <div>
                <Label
                  variant="h1"
                  className="text-primary-brown pb-2 w-full border-b-2 border-primary-brown/30"
                >
                  {item.wine_name}
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
                    <TabDeatils
                      title="Overview"
                      desc={item.winery}
                    ></TabDeatils>
                  )}
                  {activeTab === "Region" && (
                    <TabDeatils title="Region" desc={item.region}></TabDeatils>
                  )}
                  {activeTab === "Grapes" && (
                    <TabDeatils
                      title="Grapes"
                      desc={item.grape_variety}
                    ></TabDeatils>
                  )}
                </div>
              </div>

              <div className="absolute top-0 right-0">
                <MoreContentPortfolioBundle
                  data={item}
                ></MoreContentPortfolioBundle>
              </div>
            </CardContent>
          </Card>
          <BuyBundlePortfolioBtn item={item}></BuyBundlePortfolioBtn>
        </div>
      </div>
      <div className="w-full h-[58%] min-h-100 bundle-l2">
        <Card className="w-full h-full overflow-x-auto">
          <CardContent className="flex flex-nowrap gap-2 h-full ">
            {item.basket_items !== null &&
              item.basket_items.map((item2, index) => (
                <Card
                  key={index}
                  onClick={() =>
                    router.push(
                      `/vintage/marketplace/vint-ex/${item2.wine_parent_id}/${item2.wine_vintage.id}/${item2.wine_vintage.vintage}`,
                    )
                  }
                  className="w-[300px] shrink-0 p-4 hover:bg-primary-gray-500/50 transition ease-in-out"
                >
                  <CardContent className="flex flex-col items-center bg-transparent justify-between h-full">
                    <Image
                      src={item2.images[0]}
                      alt=""
                      width={400}
                      height={400}
                      className="w-60 h-60 object-contain"
                    />
                    <div className="w-full flex flex-col mt-4">
                      <Label variant="h2" className="text-primary-brown">
                        {item2.wine_vintage.name}
                      </Label>
                      <div className="flex justify-between items-center mt-4">
                        <Label>Quantity:</Label>
                        <Label className="text-white">{item.quantity}</Label>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Bottle Size:</Label>
                        <Label className="text-white">
                          {item.case_size}x
                          {item2.basket_bottle_size === "0750"
                            ? 75
                            : item2.basket_bottle_size === "1500"
                              ? 150
                              : item2.basket_bottle_size === "3000"
                                ? 300
                                : item2.basket_bottle_size === "6000"
                                  ? 600
                                  : 0}
                          cl
                        </Label>
                      </div>
                      <div className="flex justify-between items-center">
                        <Label>Market Value:</Label>
                        <Label className="text-white">
                          £ {Number(item.purchase_price).toLocaleString()}
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
