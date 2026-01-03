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
  BasketItemsT,
  BasketT,
  CartBasketT,
  StockWineVintage,
  StockWineVintageT,
  UserInvestmentWineVintage,
} from "@/lib/types";
import CartProgress from "@/components/cart/CartProgress";
import { usePortfolio } from "@/context/PortfolioContext";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";

export default function Cart() {
  const {
    cart,
    clearCart,
    removeFromCart,
    checkedItems,
    setCheckedItems,
    togglePhotoRequest,
  } = useCart();

  const { addToCartSummary, clearCartSummary } = useCartSummary();
  const { setUserDetails } = useUserContext();
  const router = useRouter();
  const handleDeleteAll = () => clearCart();
  const handleShop = () => router.push("/vintage/marketplace");
  const PHOTO_REQUEST_FEE = 25;

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

  const total_market_value = cart.reduce((total, item) => {
    if (checkedItems[item.id.toString()]) {
      const itemMarketValue =
        item.basket?.market_value || item.stock_wine_vintage?.market_value || 0;

      const quantity = quantityData[item.id.toString()] || item.quantity || 1;
      const itemTotal =
        itemMarketValue * (item.case_size || 1) * quantity +
        (item.photo_request ? PHOTO_REQUEST_FEE : 0);
      return total + itemTotal;
    }
    return total;
  }, 0);
  console.log("TOTAL VALUE: ", total_market_value);

  const handleCheckout = () => {
    cart.forEach((item) => {
      if (checkedItems[item.id.toString()]) {
        const data_list =
          item.user_investment_wine_vintage ??
          item.stock_wine_vintage ??
          (item.basket
            ? { basket: item.basket, basket_items: item.basket_items ?? [] }
            : null);

        let marketValue = 0;
        if (data_list && "market_value" in data_list) {
          marketValue = Number(data_list.market_value ?? 0);
        }

        const quantity = quantityData[item.id.toString()] ?? item.quantity;
        const itemTotal =
          marketValue * item.case_size * quantity +
          (item.photo_request ? PHOTO_REQUEST_FEE : 0);
        addToCartSummary(item); // ✅ correct per-item total
        setUserDetails({
          cart_total: total_market_value,
        });
      }
    });

    router.push("/vintage/cart/review");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex h-[5%] justify-between items-center">
        <div className="flex gap-2 items-center">
          <Checkbox
            id="select-all"
            // If cart is empty, select-all is unchecked. Otherwise true only if every item is checked
            checked={
              cart.length > 0 &&
              cart.every((item) => checkedItems[item.id.toString()])
            }
            onCheckedChange={(checked) => {
              setCheckedItems((prev) => {
                const newChecked: Record<string, boolean> = { ...prev };
                cart.forEach((item) => {
                  newChecked[item.id.toString()] = !!checked; // check/uncheck all
                });
                return newChecked;
              });
            }}
          />
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
            onClick={handleCheckout}
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
                | StockWineVintageT
                | UserInvestmentWineVintage
                | { basket: CartBasketT; basket_items: BasketItemsT[] }
                | null = null;

              if (item.user_investment_wine_vintage) {
                data_list = item.user_investment_wine_vintage;
              } else if (item.stock_wine_vintage) {
                data_list = item.stock_wine_vintage;
              } else if (item.basket) {
                data_list = {
                  basket: item.basket,
                  basket_items: item.basket_items ?? [],
                };
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

              // ✅ only read market_value when it exists
              let marketValue = 0;

              if (data_list && "market_value" in data_list) {
                marketValue = Number(data_list.market_value ?? 0);
              }

              const total_wine =
                marketValue * item.case_size * quantity +
                (item.photo_request ? PHOTO_REQUEST_FEE : 0);

              const vintage =
                (data_list as UserInvestmentWineVintage)?.vintage ??
                (data_list as StockWineVintageT)?.wine_vintage_details
                  ?.vintage ??
                (data_list as any)?.basket?.vintage ??
                null;

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

                  <div className="flex w-full gap-4">
                    <div
                      className={`${
                        item.basket === null ? "" : " overflow-hidden "
                      } flex gap-2 w-52`}
                    >
                      <WineImage
                        type={item.basket !== null ? "special-bundle" : ""}
                        src={
                          item.basket === null
                            ? item.images[0]
                            : item.basket.image
                        }
                      />
                    </div>

                    <div className="w-full flex justify-between">
                      <div className="flex gap-2 flex-col w-[90%] items-start">
                        <div className="flex gap-4 items-center">
                          <Checkbox
                            id={`select-wine-${item.id}`}
                            checked={!!checkedItems[item.id.toString()]}
                            onCheckedChange={(checked) =>
                              setCheckedItems((prev) => ({
                                ...prev,
                                [item.id.toString()]: !!checked,
                              }))
                            }
                          />
                          <Label
                            variant="h2"
                            htmlFor={`select-wine-${item.id}`}
                            className="ml-2"
                          >
                            {item.wine_name}
                          </Label>
                        </div>

                        <div className="flex items-center">
                          <Label>
                            {item.basket === null ? vintage : "---"}
                          </Label>
                          <Dot className="text-white" />
                          <Label>
                            {item.case_size}x{bottle}
                          </Label>
                        </div>

                        <div className="flex items-center gap-4">
                          <Checkbox
                            className="rounded-full"
                            id={`request_photo-${item.id}`}
                            checked={!!item.photo_request}
                            onCheckedChange={(checked) =>
                              togglePhotoRequest(item.id, checked === true)
                            }
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
        <Label variant="h1">
          Sub total: £ {total_market_value.toLocaleString()}
        </Label>
        <Button onClick={handleCheckout}>
          <ShoppingBasket></ShoppingBasket>Checkout
        </Button>
        <Button onClick={() => clearCartSummary()}>
          <Trash></Trash>
        </Button>
      </div>
    </div>
  );
}
