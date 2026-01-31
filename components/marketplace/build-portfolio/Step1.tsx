import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ChartNoAxesCombined,
  CircleCheck,
  HandHelping,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Step1({ onClick, id }: { onClick: () => void, id: string }) {
  const tabs = ["Wine Guide", "Approach", "Vintage Selection"];
  const [activeTab, setActiveTab] = useState("Wine Guide");
  const list = [
    {
      icon: CircleCheck,
      text: "Expert critic ratings & analysis",
    },
    {
      icon: TrendingUp,
      text: "Historical performance data",
    },
    {
      icon: ChartNoAxesCombined,
      text: "Current market trends",
    },
    {
      icon: HandHelping,
      text: "Strong investment potential",
    },
  ];
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-2">
        <div className="rounded-2xl mx-2 border border-primary-brown/30 overflow-hidden">
          <Image
            className="shadow-black shadow-md object-cover object-center max-h-40"
            src={"/download.jpg"}
            alt=""
            width={600}
            height={600}
          ></Image>
        </div>
        <div className="p-2 flex flex-col gap-2">
          <div className="w-full bg-primary-gray-500/30 border border-primary-brown/30 rounded-full flex items-center justify-center gap-2 p-2 px-4">
            {tabs.map((item, i) => (
              <Button
                onClick={() => setActiveTab(item)}
                variant={activeTab === item ? "default" : "ghost"}
                className="w-[33.3%] rounded-2xl"
                key={i}
              >
                {item}
              </Button>
            ))}
          </div>
          {activeTab === "Wine Guide" && (
            <Card className="bg-primary-gray-500/30">
              <CardContent className="p-2 flex flex-col gap-4 bg-transparent">
                <div className="flex w-full items-center justify-center">
                  <Label variant="h1" className="text-white">
                    Your Personal Wine Guide
                  </Label>
                </div>
                <div className="flex flex-col gap-2">
                  <Label variant="h2" className="text-primary-brown">
                    Tailored to your timeline
                  </Label>
                  <Label>
                    Just like a seasoned wine expert, the Portfolio Builder
                    offers tailored recommendations that align with your desired
                    holding period.
                  </Label>
                </div>
                <div className="flex flex-col gap-2">
                  <Label variant="h2" className="text-primary-brown">
                    Customised exit strategy
                  </Label>
                  <Label>
                    By factoring in ideal drinking windows, it helps devise a
                    customised exit strategy, ensuring you can enjoy or sell
                    your wines at the perfect moment to maximise their value or
                    taste.
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === "Approach" && (
            <Card className="bg-primary-gray-500/30">
              <CardContent className="px-2 flex flex-col gap-4 bg-transparent">
                <div className="flex flex-col gap-2">
                  <Label variant="h2" className="text-white">
                    What it does
                  </Label>
                  <Label>
                    Filters and highlights the best market opportunities based
                    on your specific criteria. Conducts thorough market
                    analysis, identifying the finest wines and vintages to
                    complement your collection.
                  </Label>
                </div>
                <div className="flex flex-col gap-2">
                  <Label variant="h2" className="text-white">
                    Our methodology
                  </Label>
                  <Label>
                    Considers expert critic ratings, historical performance, and
                    current market trends, ensuring each recommendation is
                    supported by detailed analysis and strong investment
                    potential.
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === "Vintage Selection" && (
            <Card className="bg-primary-gray-500/30">
              <CardContent className="p-2 flex flex-col gap-4 bg-transparent">
                <div className="flex w-full items-center justify-center">
                  <Label variant="h1" className="text-white">
                    Only the Finest Wines
                  </Label>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Vintage Associates recommends select wine brands that have
                    consistently dominated the market throughout history.
                  </Label>
                  <Label>
                    By choosing this strategy, you are investing in the finest
                    wines available—proven performers with a legacy of
                    excellence.
                  </Label>
                </div>
                <div>
                  {list.map((item, i) => (
                    <div key={i} className="flex gap-2 items-center ml-4">
                      <item.icon
                        size={18}
                        className="text-primary-brown"
                      ></item.icon>
                      <Label>{item.text}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <Label>
                    Our recommendations are grounded in historical performance,
                    not fleeting trends, ensuring collectors acquire not just
                    exceptional wines, but also a meaningful piece of history.
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="p-2 w-full">
        <Button onClick={onClick} className="my-4 w-full">
          Get Started
        </Button>
      </div>
    </div>
  );
}
