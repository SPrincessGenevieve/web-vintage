"use client";
import { WineImage } from "@/components/marketplace/WineImage";
import { Card, CardContent } from "../ui/card";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  RareCardT,
  SpecialBundleCardT,
  SpecialVolumesCardT,
  VintExCardT,
} from "@/lib/types";
import { WineOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface vintageT {
  item: any[]; // Changed from any to any[]
  type: string;
}

export default function CardWine({ item, type }: vintageT) {
  const router = useRouter();
  console.log("TYPE HERE: ", type);

  const [data, setData] =
    useState<
      (VintExCardT | SpecialBundleCardT | SpecialVolumesCardT | RareCardT)[]
    >(item);

  useEffect(() => {
    setData(item);
  }, [item]);

  const handleNext = (id: number) => {
    let url = "";

    if (type === "vint-ex") {
      url = `/vintage/marketplace/vint-ex/${id}`;
    }
    if (type === "special-bundle") {
      url = `/vintage/marketplace/special-bundle/${id}`;
    }
    if (type === "special-volumes") {
      url = `/vintage/marketplace/special-volumes/${id}`;
    }
    if (type === "rare") {
      url = `/vintage/marketplace/rare/${id}`;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  console.log(data);

  return (
    <Card
      className={`gap-0 ${
        data.length < 5 ? "" : "h-full"
      } overflow-y-auto relative`}
    >
      <CardContent className="flex h-full flex-wrap  marketplace-cont">
        {data.length > 0 ? (
          data.map((rawItem: any, index: number) => {
            const wine = rawItem.wine_vintage_details || rawItem;
            console.log("RAW: ", rawItem)

            return (
              <Card
                key={index}
                className="bg-transparent  hover:bg-primary-brown/10 transition ease-in-out relative py-2 rounded-none shadow-none border-0 marketplace-card w-full max-w-[400px] min-w-[25%] min-h-[200px]"
              >
                <CardContent
                  onClick={() => handleNext(type === "rare" ? rawItem.investment_id : rawItem.id)}
                  className="bg-transparent rounded-none h-full flex items-center justify-center"
                >
                  <div className="w-[90%] h-px bg-primary-brown/30 top-0 absolute"></div>
                  <div className="w-[90%] h-px bg-primary-brown/30 bottom-0 absolute"></div>
                  <div className="w-px h-[90%] bg-primary-brown/30 left-0 bottom-5 absolute"></div>
                  <div className="w-px h-[90%] bg-primary-brown/30 right-0 bottom-5 absolute"></div>
                  <div
                    className={`${
                      type === "special-bundle" ? "flex-col" : "flex-row"
                    } w-full flex gap-4`}
                  >
                    <div
                      className={`${
                        type === "special-bundle" ? "" : "max-w-25"
                      } w-full h-full flex `}
                    >
                      {/* Access images from the correct object */}
                      <WineImage
                        type={type}
                        src={
                          wine.wine_images?.[0] ||
                          rawItem.wine_images?.[0] ||
                          rawItem.wine_parent?.images?.[0] ||
                          rawItem.image
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Label className="font-semibold text-primary-brown">
                        {wine.name}
                      </Label>
                      <div className="mt-2 w-[95%]">
                        <div className="w-full flex">
                          <div className="w-1/2">
                            <Label>
                              {type === "special-bundle"
                                ? "Case Size"
                                : "Vintage"}
                            </Label>
                          </div>
                          <div className="w-1/2 flex justify-end">
                            <Label className="font-medium text-white text-right">
                              {type === "special-bundle"
                                ? wine.case_size
                                : wine.vintage_range || wine.vintage}
                            </Label>
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/2">
                            <Label>Region</Label>
                          </div>
                          <div className="w-1/2 flex justify-end">
                            <Label className="font-medium text-white text-right">
                              {wine.fromm || rawItem.fromm}
                            </Label>
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/2">
                            <Label>Grapes</Label>
                          </div>
                          <div className="w-1/2 flex justify-end">
                            <Label className="font-medium text-white text-right">
                              {wine.grapes}
                            </Label>
                          </div>
                        </div>
                        <div className="w-full flex mt-2">
                          <div className="w-full flex justify-end">
                            <Label className="font-medium text-white text-[16px] text-right">
                              {wine.price_range ||
                                rawItem.price_range ||
                                `£ ${
                                  wine.price ||
                                  Number(wine.market_value).toLocaleString()
                                }`}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-4">
            <WineOff size={40} color="white"></WineOff>
            <Label>No wines were found</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
