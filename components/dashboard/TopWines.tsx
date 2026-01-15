import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { user_data } from "@/lib/wine_data/user";
import { Button } from "../ui/button";
import { usePortfolio } from "@/context/PortfolioContext";
import { useRouter } from "next/navigation";

export default function TopWines() {
  const top_wines = user_data?.data.investment;
  const router = useRouter();
  const { portfolio } = usePortfolio();

  const top5ProfitLost = portfolio
    .slice()
    .sort((a, b) => (b.profit_lost ?? 0) - (a.profit_lost ?? 0))
    .slice(0, 5);

  console.log("PORTFOLIO: ", portfolio);

  return (
    <Card className="w-full h-full">
      <CardContent className="h-full flex flex-col">
        <div className="flex h-16 items-start justify-between">
          <Label variant="h2">Top Performing Wines</Label>
        </div>
        {portfolio.length === 0 ? (
          <div className="pt-4 gap-4 flex h-full flex-col items-center justify-center">
            <Image
              alt="delivery"
              src={
                "https://staging.vintage-associates.com/assets/assets/images/delivery-empty.4138fafeac2ab4dc924d9f2ddff26506.png"
              }
              width={400}
              height={400}
              className="w-32 h-auto"
            ></Image>
            <Button
              onClick={() => router.push("/vintage/marketplace")}
              variant={"outline"}
            >
              Request Wine
            </Button>
            <Label>You don't have any wines in your portfolio yet</Label>
          </div>
        ) : (
          <>
            {top5ProfitLost.map((item, index) => {
              const stock = item.stock_wine_vintage;
              const basket = item.basket;
              const image = Array.isArray(item.images)
                ? item.images[0]
                : item.images;

              console.log("DATA: ", item);

              console.log("P&L: ", item.profit_lost_by_percent);

              return (
                <div
                  key={item.investment_id ?? index}
                  className={`w-full flex gap-4 items-center ${
                    index === 0 ? "border-b" : "border-y"
                  } py-2 border-primary-brown/20`}
                >
                  <div className="w-[10%] min-w-32 flex items-center justify-center">
                    <Image
                      alt="wine_image"
                      width={400}
                      height={400}
                      className="h-20 w-auto rounded-2xl object-contain"
                      src={image ?? ""}
                    />
                  </div>

                  <div className="w-full flex flex-col justify-between min-h-16">
                    <Label variant="h2" className="text-primary-brown">
                      {item.wine_name}
                    </Label>

                    <div className="flex top-wine-left justify-between">
                      <div className="flex">
                        <Label className="pr-4">{item.fromm}</Label>
                        {item.vintage !== 0 ? (
                          <Label className="border-x px-4">
                            {item.vintage}
                          </Label>
                        ) : (
                          <Label className="border-l "></Label>
                        )}

                        <Label className="px-4">
                          {item.case_size}x
                          {item.bottle_size === "0750"
                            ? 75
                            : item.bottle_size === "1500"
                            ? 150
                            : item.bottle_size === "3000"
                            ? 300
                            : item.bottle_size === "6000"
                            ? 600
                            : 0}
                        </Label>
                      </div>

                      <div className="top-percent-cont flex w-40 gap-2 justify-end items-end">
                        <Label
                          className={`font-semibold rounded-sm px-1 ${
                            item.profit_lost_by_percent ?? 0 > 0
                              ? "bg-green-800"
                              : "bg-primary-red-300"
                          } text-white`}
                        >
                          {item.profit_lost ?? 0 > 0 ? "+" : ""}
                          {Number(
                            item.profit_lost_by_percent?.toFixed(2)
                          ).toLocaleString()}
                          %
                        </Label>

                        <Label className="font-semibold">
                          £{" "}
                          {Number(
                            item.purchase_price.toFixed(0)
                          ).toLocaleString()}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div></div>
      </CardContent>
    </Card>
  );
}
