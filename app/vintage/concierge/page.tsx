"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { event_list } from "@/lib/concierge/events";
import { concierge_list } from "@/lib/selection";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Concierge() {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="w-full h-full concierge-cont overflow-y-auto flex flex-col gap-4 justify-between">
      <Label variant="h2">Most Traiding Event</Label>
      <div className="w-full concierge-top gap-4 h-[40vh] scroll-area overflow-x-auto flex">
        <div className="h-full flex justify-start">
          {event_list.slice(0, 5).map((item, index) => (
            <div
              className={`w-[36vh] shrink-0 justify-between flex flex-col h-full p-2 px-4 hover:bg-primary-gray-400/30 border-r border-primary-brown/30`}
            >
              <div>
                <Image
                  src={item.image}
                  alt=""
                  width={400}
                  height={400}
                  className="object-cover h-35 rounded-2xl"
                ></Image>
                <Label variant="h2" className="text-primary-brown">
                  {item.title}
                </Label>
                <Label className="text-white">
                  {formatDate(item.start_date)} — {formatDate(item.end_date)}
                </Label>
                <Label className="text-primary-brown">{item.location}</Label>
              </div>
              <Button className="bg-primary-gray-400 text-white">
                More Details
              </Button>
            </div>
          ))}
          <div className="shrink-0">
            <Button className="h-full text-white hover:bg-primary-gray-400 bg-transparent">
              <ChevronRight></ChevronRight>
              View more
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full concierge-bottom gap-4 h-[40vh] scroll-area overflow-x-auto flex">
        <div className="h-full card-cont w-full gap-4 flex justify-between">
          {concierge_list.map((item, index) => (
            <Card
              className={`w-[42vh] card-inner-cont h-full ${
                index === 0
                  ? "bg-primary-brown"
                  : index === 1
                  ? "bg-primary-green"
                  : index === 2
                  ? "bg-primary-red-300"
                  : index === 3
                  ? "bg-primary-gray-400"
                  : ""
              } p-0 border-0`}
            >
              <CardContent className="bg-transparent border border-transparent transition ease-in-out duration-300 hover:border hover:border-primary-brown h-full p-0 flex flex-col justify-between">
                <div className="h-full flex flex-col">
                  <Image
                    src={item.image}
                    width={400}
                    height={400}
                    className="rounded-t-[14px] h-42 object-cover w-full"
                    alt=""
                  ></Image>
                  <div className="p-2">
                    <Label
                      variant="h1"
                      className={`${
                        index === 0 ? "text-black" : "text-primary-brown"
                      }`}
                    >
                      {item.title}
                    </Label>
                    <Label
                      className={`${
                        index === 0 ? "text-black" : "text-primary-brown"
                      }`}
                    >
                      {item.desc}
                    </Label>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <Button
                    className={`w-full ${
                      index === 0 &&
                      "bg-primary-gray-400 text-white hover:bg-primary-gray-400/30"
                    }`}
                  >
                    {index === 0
                      ? "Request Wine"
                      : index === 1
                      ? "Browse Event"
                      : index === 2
                      ? "Plan Event"
                      : "Request Wine"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
