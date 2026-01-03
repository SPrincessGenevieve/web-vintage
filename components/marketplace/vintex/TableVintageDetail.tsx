"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { wineVintex } from "@/lib/wine_data/vintex/index";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ShoppingBasket,
  Star,
  WineOff,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DetailsTableCard from "../DetailsTableCard";
import { Label } from "@/components/ui/label";
import UnavailableDialog from "./UnavailableDialog";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TabDeatils from "../TabDetails";
import MarketplaceChart from "../MarketplaceChart";
import DrawerBuy from "./DrawerBuy";

export default function TableVintageDetail() {
  const { setUserDetails, selected_index_vintage } = useUserContext();
  const [useContain, setUseContain] = useState(false);
  const tabs = ["Performance", "Overview", "Tasting Note"];
  const [activeTab, setActiveTab] = useState("Performance");

  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";
  const data = wineVintex[id];

  const item = data?.results?.[selected_index_vintage ?? 0];

  const [open, setOpen] = useState(item?.is_unavailable ?? false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedVintage, setSelectedVintage] = useState(item?.vintage ?? 0);
  const formattedReleasePrice =
    item?.release_price && !isNaN(Number(item?.release_price))
      ? Number(item?.release_price) > 0
        ? `+${item?.release_price}%`
        : `${item?.release_price}%`
      : "";

  const handleNotify = () => {
    toast.success("Notification set!", {
      description: "We'll let you know as soon as this wine is available.",
    });
  };

  return (
    <div className="flex  flex-col gap-4 h-full">
      <div className=" flex">
        <Button
          className="p-0 m-0 px-0 mx-0"
          variant={"ghost"}
          onClick={() => setUserDetails({ vintage_table_detail: false })}
        >
          <ChevronLeft></ChevronLeft>Back
        </Button>
      </div>
      <div className="flex gap-4 h-[35%]">
        <UnavailableDialog open={open} setOpen={setOpen}></UnavailableDialog>

        <Card className="relative p-0">
          <CardContent className="p-0">
            <div className="flex items-center p-2">
              {item?.is_unavailable && (
                <>
                  <div className="absolute bg-red-800/50 p-2 w-full flex items-center justify-center">
                    <Label className="font-bold">UNAVAILABLE</Label>
                  </div>
                  <Button
                    onClick={handleNotify}
                    className="absolute top-0 right-0"
                    variant={"ghost"}
                  >
                    <Bell></Bell>
                  </Button>
                </>
              )}
              <Image
                alt=""
                width={400}
                height={400}
                src={data?.wine_details.wine_images[0]}
                onLoadingComplete={(img) => {
                  const ratio = img.naturalWidth / img.naturalHeight;

                  // tweak threshold if needed
                  if (ratio > 1.3 || ratio < 0.75) {
                    setUseContain(true);
                  }
                }}
                className={`h-[280px] w-[360px] transition-all duration-300 ${
                  useContain ? "object-contain" : "object-cover"
                }`}
              ></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <DetailsTableCard
              name={item?.name}
              drinking_window={item?.drinking_window}
              annual_production={data?.wine_details.annual_production}
              cretic_score={item?.rp_score}
              reviewed_by={item?.rp_reviewer}
            ></DetailsTableCard>
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
                  Number(item?.release_price) > 0
                    ? "text-green-500"
                    : Number(item?.release_price) < 0
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
              <div className="flex justify-between w-full gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full justify-between gap-2 border-2 border-black rounded-[10px] p-2">
                    <Label className="text-black font-bold">
                      {selectedVintage}
                    </Label>
                    <ChevronDown size={20} color="black"></ChevronDown>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {data?.results.map((item, index) => (
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedVintage(item?.vintage);
                          setSelectedIndex(index);
                          setUserDetails({ selected_index_vintage: index });
                        }}
                        className="flex justify-between"
                        key={index}
                      >
                        {item?.vintage}
                        {item?.is_very_special && <Star></Star>}
                        {item?.is_unavailable && <WineOff></WineOff>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DrawerBuy
                  type={"vint-ex"}
                  trigger={
                    <Button
                      disabled={item?.is_unavailable && true}
                      className="bg-primary-gray-500 text-primary-brown hover:text-black border-2 border-transparent h-10 hover:border-black"
                    >
                      <ShoppingBasket /> Buy this vintage
                    </Button>
                  }
                  parent_data={data}
                  result={item}
                  result_data={data?.results}
                  bottle_size={data?.default_vintage.wine_vintage.bottle_size}
                  default_case_size_list={
                    data?.default_vintage.wine_vintage.available_case_size
                  }
                ></DrawerBuy>
              </div>

              <div className="flex flex-col items-end">
                <Label variant="p" className="text-black">
                  Market Value
                </Label>
                <Label
                  variant="h1"
                  className="text-black text-[25px] font-bold"
                >
                  £{Number(item?.market_value).toLocaleString()}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="h-full w-full">
        <CardContent className="h-full overflow-y-auto">
          {activeTab === "Performance" && (
            <MarketplaceChart
              release_price={Number(item?.release_price)}
              lwin11={item?.lwin11}
              lifetime_performance={formattedReleasePrice}
              data={data}
              result={data?.results}
            ></MarketplaceChart>
          )}
          {activeTab === "Overview" && (
            <TabDeatils
              title="Overflow"
              desc={data?.wine_details.winery}
            ></TabDeatils>
          )}
          {activeTab === "Tasting Note" && (
            <TabDeatils
              title="Tasting Note"
              desc={item?.rp_tasting_notes}
            ></TabDeatils>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
