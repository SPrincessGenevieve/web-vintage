import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { CartItemT } from "@/lib/types";
import { Label } from "../ui/label";
import TabDeatils from "../marketplace/TabDetails";
import MoreContent from "./MoreContentWineCellar";
import DetailsCardWineCellar from "./DetailsCardWineCellar";
import WineCellarDetailChart from "./WineCellarDetailChart";
import MoreContentWineCellar from "./MoreContentWineCellar";

export default function WineCellarDetailSingle({ item }: { item: CartItemT }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Performance");
  const imgSrc = item.images[0];
  const tabs = ["Performance", "Overview", "Region", "Grapes"];

  const release_price = item.stock_wine_vintage?.release_price;

  const formattedReleasePrice =
    release_price && !isNaN(Number(release_price))
      ? Number(release_price) > 0
        ? `+${release_price}%`
        : `${release_price}%`
      : "";

  const generateProfitLoss = (id: string, purchasePrice: number) => {
    const KEY = `pl_${id}`;
    const now = Date.now();
    const DAY = 1000 * 60 * 60 * 24;

    const cached = localStorage.getItem(KEY);

    if (cached) {
      const data = JSON.parse(cached);

      // keep value if less than 24 hours old
      if (now - data.timestamp < DAY) {
        return data.value;
      }
    }

    // generate new values
    const percentage = Number((Math.random() * 40 - 15).toFixed(2));
    const value = Number(((purchasePrice * percentage) / 100).toFixed(2));

    const result = {
      profit_loss_value: value,
      profit_loss_percent: percentage,
    };

    localStorage.setItem(
      KEY,
      JSON.stringify({ value: result, timestamp: now })
    );

    return result;
  };

  const { profit_loss_value, profit_loss_percent } = generateProfitLoss(
    String(item.id),
    item.purchase_price
  );

  console.log("DETAIL DATA: ", item);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className=" flex">
        <Button
          className="p-0 m-0 px-0 mx-0"
          variant={"ghost"}
          onClick={() => router.push("/vintage/cellar")}
        >
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
                src={imgSrc ?? "/placeholder.png"}
                className={`h-full max-h-[280px] w-[360px] transition-all duration-300 object-contain`}
              ></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="relative p-4 flex flex-col justify-between h-full">
            <DetailsCardWineCellar
              name={item.wine_name}
              quantity={item.quantity}
              purchase_price={item.purchase_price}
              profit_loss={profit_loss_value}
              profit_loss_percent={profit_loss_percent}
              status={item.status}
              purchase_date={item.purchase_date}
            ></DetailsCardWineCellar>
            <MoreContentWineCellar data={item}></MoreContentWineCellar>
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

      {/* PERFORMANCE */}
      <div className="w-full flex justify-between gap-4">
        <Card className="w-full">
          <CardContent className="flex h-full">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Label
                className={`text-[18px] md:text-lg font-poppins-medium ${
                  Number(release_price) > 0
                    ? "text-green-500"
                    : Number(release_price) < 0
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

        <Card className="w-full max-w-[300px] p-0 m-0 bg-primary-gray-400">
          <CardContent className="flex bg-transparent p-0">
            <div className="flex flex-col w-full items-end gap-4">
              <div className="flex justify-center items-center w-full gap-2 rounded-t-[14px] bg-primary-gray-500/50 border-b border-primary-brown/50 p-4">
                <Button className="bg-red-800 border-2 border-red-800 hover:bg-red-700 text-white w-1/2">
                  Sell
                </Button>
                <Button className="border-2 border-primary-gray-500 w-1/2">
                  Buy
                </Button>
              </div>

              <div className="flex flex-col items-end p-2">
                <Label className="text-primary-brown">Market Value</Label>
                <Label
                  variant="h1"
                  className="text-primary-brown text-[25px] font-bold"
                >
                  £
                  {Number(
                    item.stock_wine_vintage?.market_value
                  ).toLocaleString()}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="h-full w-full">
        <CardContent className="h-full overflow-y-auto">
          {activeTab === "Performance" && (
            <WineCellarDetailChart
              lwin11={item.stock_wine_vintage?.lwin11 ?? ""}
              vintage={item.vintage}
              case_size={item.case_size}
              wine_name={item.wine_name}
              bottle_size={item.bottle_size}
            ></WineCellarDetailChart>
          )}
          {activeTab === "Overview" && (
            <TabDeatils title="Overflow" desc={item.winery}></TabDeatils>
          )}
          {activeTab === "Region" && (
            <TabDeatils title="Region" desc={item.region}></TabDeatils>
          )}
          {activeTab === "Grapes" && (
            <TabDeatils title="Grapes" desc={item.grape_variety}></TabDeatils>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
