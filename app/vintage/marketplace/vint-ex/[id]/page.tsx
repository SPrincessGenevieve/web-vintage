"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { wineVintex } from "@/lib/wine_data/vintex/index";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DetailsCard from "@/components/marketplace/DetailsCard";
import VintageTable from "@/components/marketplace/vintex/VintageTable";
import TabDeatils from "@/components/marketplace/TabDetails";
import DrawerVintage from "@/components/marketplace/vintex/DrawerVintage";
import { useUserContext } from "@/context/UserContext";
import { ChevronLeft, Wine } from "lucide-react";

export interface VintageT {
  vintage: number;
  index: number;
}

export default function VintExDetail() {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop() || "";
  const data = wineVintex[id];
  const { vintage_table_detail, setUserDetails } = useUserContext();

  const [useContain, setUseContain] = useState(false);
  const [activeTab, setActiveTab] = useState("Vintage");
  const tabs = ["Vintage", "Overview", "Region", "Grapes"];

  console.log("DATA: ", data);

  // Don't use state for this if it's derived from 'data'
  // const [vintageList, setVintageList] = useState<VintageT[]>([]);

  if (!data) {
    return <div>Wine data not found for ID: {id}</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className=" flex">
        <Button
          className="p-0 m-0 px-0 mx-0"
          variant={"ghost"}
          onClick={() => router.push("/vintage/marketplace")}
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
                src={data.wine_details.images[0]}
                onLoadingComplete={(img) => {
                  const ratio = img.naturalWidth / img.naturalHeight;

                  // tweak threshold if needed
                  if (ratio > 1.3 || ratio < 0.75) {
                    setUseContain(true);
                  }
                }}
                className={`h-auto max-h-[280px] w-[360px] transition-all duration-300 ${
                  useContain ? "object-contain" : "object-cover"
                }`}
              ></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <DetailsCard
              name={data.wine_details.name}
              alcohol_abv={data.wine_details.alcohol_abv ?? ""}
              blend={data.wine_details.blend ?? ""}
              grapes={data.wine_details.grapes ?? ""}
              ownership={data.wine_details.ownership ?? ""}
            ></DetailsCard>
            <div>
              <DrawerVintage
                raw_data={data}
                parent_data={data.wine_details}
                trigger={
                  <Button className="text-black">
                    <Wine className="mr-2 h-4 w-4" /> Choose your vintage
                  </Button>
                }
                result_data={data.results}
                bottle_size={data.default_vintage.wine_vintage.bottle_size}
                default_case_size_list={
                  data.default_vintage.wine_vintage.available_case_size
                }
              ></DrawerVintage>
            </div>
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
      <Card className="h-full w-full">
        <CardContent className="h-full overflow-y-auto">
          {activeTab === "Vintage" && (
            <VintageTable
              id={id}
              case_size={data.default_vintage.case_size}
              bottle_size={data.results[0].bottle_size}
              data={data.results}
              parent_wine_name={data.wine_details.name}
            ></VintageTable>
          )}
          {activeTab === "Overview" && (
            <TabDeatils
              title="Overflow"
              desc={data.wine_details.winery ?? ""}
            ></TabDeatils>
          )}
          {activeTab === "Region" && (
            <TabDeatils
              title="Region"
              desc={data.wine_details.region ?? ""}
            ></TabDeatils>
          )}
          {activeTab === "Grapes" && (
            <TabDeatils
              title="Grapes"
              desc={data.wine_details.grape_variety ?? ""}
            ></TabDeatils>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
