"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import { useCart } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import { CartItemT } from "@/lib/types";
import { table } from "console";
import { FilePen, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Step5({
  edit,
  next,
  id,
}: {
  edit: () => void;
  next: () => void;
  id: string;
}) {
  const { portfolio_builder } = usePortfolioBuilder();
  const { setUserDetails, cart_total } = useUserContext()
  const { addToCart } = useCart();
  const totalMarketValue = portfolio_builder
    .flatMap((item) => item.wine_list ?? []) // flatten all wine_list arrays
    .reduce(
      (sum, wine) => sum + (wine.stock_wine_vintage?.market_value ?? 0),
      0,
    );

  const cases = portfolio_builder.map((item) => item.wine_list?.length);
  const wine_list = portfolio_builder.map((item) => item?.wine_list);

  const handleAddToCart = () => {
    wine_list
      ?.flat()
      .filter((item): item is CartItemT => Boolean(item))
      .forEach(addToCart);
    next();
     setUserDetails({
      cart_total: Number(cart_total) + Number(cases),
    });
  };

  return (
    <div className="">
      <div className="w-full h-full pb-4 min-h-100 flex flex-col gap-2 p-4">
        <div className="p-4">
          <Label className="text-white text-center py-2" variant="h2">
            Based on your preferences, here are the finest wines selected for
            you.
          </Label>
        </div>
        {portfolio_builder.map((item, i) =>
          item.wine_list?.map((item2, i2) => {
            const bottle_size =
              item2.bottle_size === "0750"
                ? 75
                : item2.bottle_size === "1500"
                  ? 150
                  : item2.bottle_size === "3000"
                    ? 300
                    : item2.bottle_size === "6000"
                      ? 600
                      : 0;
            const table_detail = [
              {
                label: "Vintage",
                value: item2.vintage,
              },
              {
                label: "Region",
                value: item2.fromm,
              },
              {
                label: "Grapes",
                value: item2.grapes,
              },
              {
                label: "Market Value",
                value:
                  item2.stock_wine_vintage?.market_value !== 0.0
                    ? `£ ${Number(item2.stock_wine_vintage?.market_value).toLocaleString()}`
                    : `£  ${Number(item2.stock_wine_vintage.liv_ex_value).toLocaleString()}`,
              },
            ];
            // liv_ex_value
            return (
              <div className="">
                <Card className="bg-primary-gray-600/30">
                  <CardContent className="bg-transparent">
                    <div className="flex flex-col gap-2">
                      <Card className="bg-primary-gray-500 relative">
                        <CardContent className="bg-transparent py-4 gap-4 w-full flex flex-col items-center justify-center">
                          <Image
                            src={item2.images[0] ?? ""}
                            className="h-45 w-auto object-cover"
                            alt=""
                            width={500}
                            height={500}
                          ></Image>
                          <Label className="absolute left-2 bottom-2">
                            {item2.case_size}x{bottle_size}cl
                          </Label>
                        </CardContent>
                      </Card>
                      <div>
                        <Label className="font-semibold text-primary-brown">
                          {item2.wine_name}
                        </Label>
                        <div className="rounded-2xl overflow-hidden">
                          <Table>
                            <TableBody>
                              {table_detail.map((item3, i3) => (
                                <TableRow className="border-primary-brown/30">
                                  <TableCell>
                                    <Label>{item3.label}</Label>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex justify-end">
                                      <Label className="text-white font-semibold">
                                        {item3.value}
                                      </Label>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }),
        )}
      </div>
      <div className="w-full min-h-18 rounded-b-[5px] bg-primary-gray-500 flex flex-col justify-center gap-4 p-4 mt-4">
        <div className="flex justify-between">
          <div className="w-full flex flex-col ">
            <Label className="font-thin text-white" variant="p">
              Total Cases
            </Label>
            <Label className="font-bold text-primary-brown text-2xl">
              {cases} total cases
            </Label>
          </div>
          <div className="w-full flex flex-col items-end">
            <Label className="font-thin text-white" variant="p">
              Total Investment
            </Label>
            <Label className="font-bold text-primary-brown text-2xl">
              £ {Number(totalMarketValue.toFixed(2)).toLocaleString()}
            </Label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2">
          <Button onClick={edit} className="w-1/2">
            <FilePen></FilePen>Update Preference
          </Button>
          <Button
            onClick={handleAddToCart}
            variant={"outline"}
            className="w-1/2"
          >
            <ShoppingBasket></ShoppingBasket> Add to Basket
          </Button>
        </div>
      </div>
    </div>
  );
}
