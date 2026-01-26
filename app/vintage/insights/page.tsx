"use client";
import React, { useEffect, useState } from "react";
import { ingihts_list } from "@/lib/insights/insights";
import { InsightsT } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Insights() {
  const router = useRouter();
  const [data, setData] = useState<InsightsT[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<InsightsT[]>([]);

  useEffect(() => {
    if (data.length === 0) {
      setData(ingihts_list);
    }
  }, [data.length]);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log("Width changed:", window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(width);

  const top3 = data.slice(0, 4);
  const card1 = top3[0];

  const handleDetails = (id: number) => {
    router.push(`/vintage/insights/${id}`);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item) =>
      item.title
        .trim()
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
    );

    setTimeout(() => {
      setFilteredData(filtered);
    }, 500);
  }, [search, data]);

  console.log("search: ", search);
  console.log("DATA: ", data);
  console.log("FILTERED DATA: ", filteredData);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label variant="h1" className="pb-2 text-primary-brown">
          Essential Insights from Wine Investment Trends
        </Label>
      </div>
      <div className="flex gap-4 insight-header-cont">
        <Card
          onClick={() => handleDetails(card1?.id)}
          className="w-full max-w-[50%] insight-header-top p-0 border-none"
        >
          <CardContent className="flex flex-col h-full justify-between gap-4 p-0 bg-transparent overflow-hidden cursor-pointer">
            <div>
              <Image
                src={card1?.image_header}
                className="rounded-b-full  w-full max-h-50 object-cover object-center"
                width={900}
                height={900}
                alt=""
              ></Image>
              <div className="flex flex-col gap-4 p-4">
                <div>
                  <Label className="text-primary-brown" variant="h1">
                    {card1?.title}
                  </Label>
                  <Label>Vintage Associates</Label>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>{card1?.description}</Label>

                  {card1?.body.map(
                    (item, index) =>
                      index === 0 && (
                        <div>
                          <Label>{item.caption}</Label>
                          <Label>{item.content}</Label>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4 insight-header-bottom w-[50%]">
          {top3.map(
            (item, index) =>
              index !== 0 && (
                <Card
                  onClick={() => handleDetails(item.id)}
                  className={`p-0 overflow-hidden  cursor-pointer h-full`}
                >
                  <CardContent className="flex gap-2 relative cursor-pointer p-0 min-h-30 h-full justify-between transition ease-in-out hover:bg-primary-gray-500">
                    <div
                      className={`${width <= 470 ? "flex-col" : "flex-row"} flex gap-2 w-full`}
                    >
                      <div className="max-w-[10vh] insight-t-img-cont">
                        <Image
                          src={item.image_header}
                          alt=""
                          width={900}
                          height={900}
                          className="insight-t-img w-full h-full object-cover rounded-r-full"
                        ></Image>
                      </div>
                      <div className="flex w-full flex-col gap-2 justify-between">
                        <div className="p-2">
                          <div>
                            <Label className="text-primary-brown" variant="h1">
                              {item.title}
                            </Label>
                            <Label>Vintage Associates</Label>
                          </div>
                          <div>
                            <Label>{item.description}</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div>
            <Label variant="h2" className="text-white">
              Insights & Trends in Wine Investing
            </Label>
          </div>
          <div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-[300px]"
              placeholder="search post"
            ></Input>
          </div>
        </div>
        <div>
          <div
            className={`grid 
          ${
            width > 1580 && width < 1680
              ? "grid-cols-3"
              : width > 1130 && width < 1580
                ? "grid-cols-2"
                : width <= 1130
                  ? "grid-cols-1"
                  : "grid-cols-3"
          } gap-4`}
          >
            {filteredData.map(
              (item, index) =>
                item.id > 4 && (
                  <div>
                    <Card
                      onClick={() => handleDetails(item.id)}
                      className="min-w-[300px] hover:bg-primary-gray-400/30 transition ease-in-out h-full border-0 bg-transparent p-0 overflow-hidden"
                    >
                      <CardContent
                        className={`flex bg-transparent p-0 ${width <= 470 ? "flex-col" : "flex-row"} justify-start gap-2 w-full h-full`}
                      >
                        <div
                          className={`${width <= 470 ? "flex-col w-full" : "w-40"} h-45 flex`}
                        >
                          <Image
                            src={item.image_header}
                            alt=""
                            width={900}
                            height={900}
                            className="w-full h-full object-cover insight-b-img rounded-r-full"
                          ></Image>
                        </div>
                        <div className="flex flex-col w-full p-2">
                          <div className="w-full h-full">
                            <Label variant="h2" className="text-white">
                              {item.title}
                            </Label>
                            <Label className="font-normal">
                              {item.description}
                            </Label>
                            <Label className="font-thin">
                              Vintage Associates
                            </Label>
                          </div>
                          <div className="w-full flex justify-end">
                            <Button>
                              Read <ChevronRight></ChevronRight>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      {filteredData.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <Label>No post found</Label>
        </div>
      )}
    </div>
  );
}
