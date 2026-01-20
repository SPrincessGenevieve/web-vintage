"use client";
import { WineImage } from "@/components/marketplace/WineImage";
import { Card, CardContent } from "../ui/card";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  BasketT,
  RareCardT,
  SpecialBundleCardT,
  SpecialVolumesCardT,
  VintExCardT,
  CartItemT,
} from "@/lib/types";
import { WineOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface vintageT {
  item: any[]; // Changed from any to any[]
  type: string;
}

export default function CardWineRare({ item, type }: vintageT) {
  const router = useRouter();
  console.log("TYPE HERE: ", type);

  const [data, setData] = useState<RareCardT[]>(item);
  const [dataBundle, setDataBundle] = useState<RareCardT[]>(item);

  useEffect(() => {
    const single = item.filter((i) => i.basket_details == null);
    const bundle = item.filter((i) => i.basket_details != null);
    setData(single);
    setDataBundle(bundle);
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

  return (
    <Card className=" overflow-y-auto relative">
      <CardContent className="flex flex-col gap-8">
        <Card
          className={`gap-0 border-none shadow-none p-0 ${data.length < 5 ? "" : "h-full"}`}
        >
          <CardContent className="flex h-full p-0 flex-wrap  marketplace-cont">
            {data.length > 0 ? (
              <>
                {data.map((rawItem: RareCardT, index: number) => {
                  const wine = rawItem.wine_vintage_details || rawItem;
                  console.log("RAW: ", rawItem);
                  const srcImg =
                    rawItem?.basket_details?.image ?? // 1️⃣ use basket_details image if it exists
                    rawItem?.wine_parent?.images?.[0] ?? // 3️⃣ fallback to wine_parent.images
                    "";
                  const typeData =
                    rawItem.basket_details === null
                      ? "vintex"
                      : "special-bundle";

                  return (
                    <>
                      <Card
                        key={index}
                        className="bg-transparent  hover:bg-primary-brown/10 transition ease-in-out relative py-2 rounded-none shadow-none border-0 marketplace-card w-full max-w-[400px] min-w-[25%] min-h-[200px]"
                      >
                        <CardContent
                          onClick={() => handleNext(rawItem.investment_id)}
                          className="bg-transparent rounded-none h-full flex items-center justify-center"
                        >
                          <div className="w-[90%] h-px bg-primary-brown/30 top-0 absolute"></div>
                          <div className="w-[90%] h-px bg-primary-brown/30 bottom-0 absolute"></div>
                          <div className="w-px h-[90%] bg-primary-brown/30 left-0 bottom-5 absolute"></div>
                          <div className="w-px h-[90%] bg-primary-brown/30 right-0 bottom-5 absolute"></div>
                          <div
                            className={`${
                              typeData === "special-bundle"
                                ? "flex-col"
                                : "flex-row"
                            } w-full flex gap-4`}
                          >
                            <div
                              className={`${
                                typeData === "special-bundle"
                                  ? "bg-[red] h-full w-auto rounded-2xl"
                                  : "max-w-25 w-full h-full"
                              }  flex items-center justify-center `}
                            >
                              {/* Access images from the correct object */}
                              <Image
                                src={srcImg}
                                alt=""
                                className={`object-contain w-full ${typeData === "special-bundle" ? "h-full max-h-30" : "h-[100px] "}`}
                                width={400}
                                height={400}
                              ></Image>
                            </div>
                            <div className="w-full">
                              <Label className="font-semibold text-primary-brown">
                                {wine.name}
                              </Label>
                              <div className="mt-2 w-[95%]">
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>
                                      {typeData === "special-bundle"
                                        ? "Case Size"
                                        : "Vintage"}
                                    </Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.case_size
                                        : rawItem.wine_vintage_details.vintage}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>Region</Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.basket_details?.fromm
                                        : rawItem.wine_parent.fromm}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>Grapes</Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.basket_details?.grapes
                                        : rawItem.wine_parent.grapes}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex mt-2">
                                  <div className="w-full flex justify-end">
                                    <Label className="font-medium text-white text-[16px] text-right">
                                      £{" "}
                                      {typeData === "special-bundle"
                                        ? Number(
                                            Number(
                                              rawItem.basket_details
                                                ?.market_value,
                                            ).toFixed(2),
                                          ).toLocaleString()
                                        : Number(
                                            Number(
                                              rawItem.wine_vintage_details
                                                .market_value,
                                            ).toFixed(2),
                                          ).toLocaleString()}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })}
              </>
            ) : (
              <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-4">
                <WineOff size={40} color="white"></WineOff>
                <Label>No wines were found</Label>
              </div>
            )}
          </CardContent>
        </Card>
       <div>
        <div className="w-auto flex border-b border-primary-brown/30 my-4 border-dotted">

       </div>
        <Card
          className={`gap-0 border-none rounded-none p-0 ${
            dataBundle.length < 5 ? "" : "h-full"
          } `}
        >
          <CardContent className="flex h-full p-0 flex-wrap  marketplace-cont">
            {dataBundle.length > 0 ? (
              <>
                {dataBundle.map((rawItem: RareCardT, index: number) => {
                  const wine = rawItem.wine_vintage_details || rawItem;
                  console.log("RAW: ", rawItem);
                  const srcImg =
                    rawItem?.basket_details?.image ?? // 1️⃣ use basket_details image if it exists
                    rawItem?.wine_parent?.images?.[0] ?? // 3️⃣ fallback to wine_parent.images
                    "";
                  const typeData =
                    rawItem.basket_details === null
                      ? "vintex"
                      : "special-bundle";

                  return (
                    <>
                      <Card
                        key={index}
                        className="bg-transparent  hover:bg-primary-brown/10 transition ease-in-out relative py-2 rounded-none shadow-none border-0 marketplace-card w-full max-w-[400px] min-w-[25%] min-h-[200px]"
                      >
                        <CardContent
                          onClick={() => handleNext(rawItem.investment_id)}
                          className="bg-transparent rounded-none h-full flex items-center justify-center"
                        >
                          <div className="w-[90%] h-px bg-primary-brown/30 top-0 absolute"></div>
                          <div className="w-[90%] h-px bg-primary-brown/30 bottom-0 absolute"></div>
                          <div className="w-px h-[90%] bg-primary-brown/30 left-0 bottom-5 absolute"></div>
                          <div className="w-px h-[90%] bg-primary-brown/30 right-0 bottom-5 absolute"></div>
                          <div
                            className={`${
                              typeData === "special-bundle"
                                ? "flex-col"
                                : "flex-row"
                            } w-full flex gap-4`}
                          >
                            <div
                              className={`${
                                typeData === "special-bundle"
                                  ? "h-full w-auto bg-black rounded-2xl"
                                  : "max-w-25 w-full h-full"
                              }  flex items-center justify-center `}
                            >
                              {/* Access images from the correct object */}
                              <Image
                                src={srcImg}
                                alt=""
                                className={`object-contain w-full ${typeData === "special-bundle" ? "h-full max-h-30" : "h-[100px] "}`}
                                width={400}
                                height={400}
                              ></Image>
                            </div>
                            <div className="w-full">
                              <Label className="font-semibold text-primary-brown">
                                {wine.name}
                              </Label>
                              <div className="mt-2 w-[95%]">
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>
                                      {typeData === "special-bundle"
                                        ? "Case Size"
                                        : "Vintage"}
                                    </Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.case_size
                                        : rawItem.wine_vintage_details.vintage}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>Region</Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.basket_details?.fromm
                                        : rawItem.wine_parent.fromm}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex">
                                  <div className="w-1/2">
                                    <Label>Grapes</Label>
                                  </div>
                                  <div className="w-1/2 flex justify-end">
                                    <Label className="font-medium text-white text-right">
                                      {typeData === "special-bundle"
                                        ? rawItem.basket_details?.grapes
                                        : rawItem.wine_parent.grapes}
                                    </Label>
                                  </div>
                                </div>
                                <div className="w-full flex mt-2">
                                  <div className="w-full flex justify-end">
                                    <Label className="font-medium text-white text-[16px] text-right">
                                      £{" "}
                                      {typeData === "special-bundle"
                                        ? Number(
                                            Number(
                                              rawItem.basket_details
                                                ?.market_value,
                                            ).toFixed(2),
                                          ).toLocaleString()
                                        : Number(
                                            Number(
                                              rawItem.wine_vintage_details
                                                .market_value,
                                            ).toFixed(2),
                                          ).toLocaleString()}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })}
              </>
            ) : (
              <div className="w-full h-full p-2 flex flex-col items-center justify-center gap-4">
                <WineOff size={40} color="white"></WineOff>
                <Label>No wines were found</Label>
              </div>
            )}
          </CardContent>
        </Card>
       </div>
      </CardContent>
    </Card>
  );
}
