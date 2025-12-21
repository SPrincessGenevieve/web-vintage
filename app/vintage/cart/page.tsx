"use client";

import { Label } from "@/components/ui/label";
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Dot, Minus, Plus, ShoppingBasket, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { WineImage } from "@/components/marketplace/WineImage";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CartBasketT,
  StockWineVintage,
  UserInvestmentWineVintage,
} from "@/lib/types";
import CartProgress from "@/components/cart/CartProgress";

export default function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
  const router = useRouter();

  const handleDeleteAll = () => clearCart();
  const handleShop = () => router.push("/vintage/marketplace");

  const [quantityData, setQuantityData] = React.useState<
    Record<string, number>
  >(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("cart_quantities");
    return saved ? JSON.parse(saved) : {};
  });

  React.useEffect(() => {
    const newQuantities: Record<string, number> = { ...quantityData };
    cart.forEach((item) => {
      if (newQuantities[item.id.toString()] === undefined) {
        newQuantities[item.id.toString()] = item.quantity;
      }
    });
    setQuantityData(newQuantities);
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem("cart_quantities", JSON.stringify(quantityData));
  }, [quantityData]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex h-[5%] justify-between items-center">
        <div className="flex gap-2 items-center">
          <Checkbox id="select-all"></Checkbox>
          <Label htmlFor="select-all">Wine Cellar ({cart.length})</Label>
        </div>
        <CartProgress step={1}></CartProgress>
        <Button onClick={handleDeleteAll} variant="ghost">
          <Trash className="text-red-700" /> Delete All
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="w-full h-[90%] flex flex-col items-center justify-center">
          <ShoppingBasket
            className="text-primary-brown"
            size={120}
            strokeWidth={1}
          />
          <div className="flex flex-col gap-2">
            <Label className="text-white">Your wine cellar is empty</Label>
            <Button onClick={handleShop}>Shop Marketplace</Button>
          </div>
        </div>
      ) : (
        <Card className="h-[88%] overflow-y-auto">
          <CardContent>
            {cart.map((item) => {
              let data_list:
                | StockWineVintage
                | UserInvestmentWineVintage
                | CartBasketT
                | null = null;

              if (
                item.stock_wine_vintage == null &&
                item.basket == null &&
                item.user_investment_wine_vintage != null
              ) {
                data_list = item.user_investment_wine_vintage;
              } else if (
                item.user_investment_wine_vintage == null &&
                item.basket == null &&
                item.stock_wine_vintage != null
              ) {
                data_list = item.stock_wine_vintage;
              } else if (
                item.stock_wine_vintage == null &&
                item.user_investment_wine_vintage == null &&
                item.basket != null
              ) {
                data_list = item.basket;
              } else {
                data_list =
                  item.stock_wine_vintage ??
                  item.user_investment_wine_vintage ??
                  item.basket ??
                  null;
              }

              const bottle =
                (data_list as any)?.bottle_size === "0750"
                  ? 75
                  : (data_list as any)?.bottle_size === "1500"
                  ? 150
                  : (data_list as any)?.bottle_size === "3000"
                  ? 300
                  : (data_list as any)?.bottle_size === "6000"
                  ? 600
                  : 0;

              const quantity =
                quantityData[item.id.toString()] ?? item.quantity;

              const total_wine =
                Number(data_list.market_value) * item.case_size * quantity;

              return (
                <div
                  key={item.id}
                  className="w-full relative border-b border-primary-brown/30 p-4 flex flex-col gap-4"
                >
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute right-0 flex items-center text-red-700"
                    variant={"ghost"}
                  >
                    Delete
                  </Button>
                  <div className="flex gap-4 items-center ml-6">
                    <Checkbox id={`select-wine-${item.id}`} />
                    <Label
                      variant="h2"
                      htmlFor={`select-wine-${item.id}`}
                      className="ml-2"
                    >
                      {item.wine_name}
                    </Label>
                  </div>

                  <div className="flex w-full">
                    <div
                      className={`${
                        item.basket === null ? "w-16" : ""
                      } flex gap-2`}
                    >
                      <WineImage src={item.images[0]} />
                    </div>

                    <div className="w-full flex justify-between">
                      <div className="flex ml-1 gap-2 flex-col w-[90%] items-start">
                        <div className="flex items-center">
                          <Label>{data_list?.vintage}</Label>
                          <Dot className="text-white" />
                          <Label>
                            {item.case_size}x{bottle}
                          </Label>
                        </div>

                        <div className="flex items-center gap-4">
                          <Checkbox
                            className="rounded-full"
                            id={`request_photo-${item.id}`}
                          />
                          <Label htmlFor={`request_photo-${item.id}`}>
                            Request a photo
                          </Label>
                        </div>

                        <div className="flex min-w-32 justify-between gap-2 border border-white/30 rounded-[10px] p-2">
                          <Button
                            disabled={quantity <= 1}
                            onClick={() =>
                              setQuantityData({
                                ...quantityData,
                                [item.id.toString()]: Math.max(1, quantity - 1),
                              })
                            }
                            className="p-0 m-0 h-5"
                            variant="ghost"
                          >
                            <Minus color="red" />
                          </Button>

                          <Label>{quantity}</Label>

                          <Button
                            onClick={() =>
                              setQuantityData({
                                ...quantityData,
                                [item.id.toString()]: quantity + 1,
                              })
                            }
                            className="p-0 m-0 h-5"
                            variant="ghost"
                          >
                            <Plus className="text-green-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="h-full flex items-baseline-last">
                        <Label className="flex" variant="h1">
                          £ {Number(total_wine).toLocaleString()}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
      <div className="flex gap-4 justify-end">
        <Label variant="h1">Sub total: £</Label>
        <Button>
          <ShoppingBasket></ShoppingBasket>Checkout
        </Button>
      </div>
    </div>
  );
}
