"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";
import { ChevronLeft, Edit, Plus, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import CartProgress from "@/components/cart/CartProgress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreditCard from "@/components/CreditCard";
import SummaryDetailWine from "@/components/cart/SummaryDetailWine";
import { useCart } from "@/context/CartContext";
import { usePortfolio } from "@/context/PortfolioContext";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { v4 as uuidv4 } from "uuid";
import { useRare } from "@/context/RareContext";
import { useActivities } from "@/context/ActivitiesContext";
import { ActivitiesT } from "@/lib/types";
import { today } from "@/lib/today";
import DepositDialog from "@/components/DepositDialog";

export default function Review() {
  const router = useRouter();
  const { cart_summary, clearCartSummary } = useCartSummary();
  const {
    cart_total,
    current_investment,
    payment_method,
    account_bal,
    setUserDetails,
  } = useUserContext();
  const { cart, checkedItems, removeFromCart } = useCart();
  const { removeFromRare } = useRare();
  const { portfolio, addToPortfolio } = usePortfolio();
  const { addToActivities, clearActivities, activities } = useActivities();
  const [photoReq, setPhotoReq] = useState(0);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const count = cart_summary.filter((item) => item.photo_request).length;
    setPhotoReq(count);
  }, [cart_summary]); // runs whenever cart_summary changes

  const initial_total = cart_total + photoReq;
  let monthly_fee = 0;

  // Tiered fee percentages
  if (initial_total < 5000) {
    monthly_fee = initial_total * 0.002; // 0.2% monthly
  } else if (initial_total < 20000) {
    monthly_fee = initial_total * 0.0015; // 0.15%
  } else if (initial_total < 50000) {
    monthly_fee = initial_total * 0.001; // 0.1%
  } else {
    monthly_fee = initial_total * 0.0007; // 0.07%
  }

  const summary = [
    {
      title: "Wine Total",
      value: Number(cart_total).toLocaleString(),
    },
    {
      title: "Photo Request Total",
      value: photoReq * 16.99,
    },
    {
      title: "Monthly Fee Due",
      value: Number(monthly_fee.toFixed(2)).toLocaleString(),
    },
    {
      title: "Current Investment",
      value: current_investment.toLocaleString(),
    },
    {
      title: "New Investment",
      value: (current_investment + cart_total).toLocaleString(),
    },
  ];

  const [selectedPayment, setSelectedPayment] = React.useState(
    payment_method.find((c) => c.is_default)?.last_code || "account-bal",
  );

  const generateProfitLoss = (id: string, purchasePrice: number) => {
    const KEY = `pl_${id}`;
    const now = Date.now();
    const DAY = 1000 * 60 * 60 * 24;

    const cached = localStorage.getItem(KEY);

    if (cached) {
      const data = JSON.parse(cached);

      // keep value if less than 24 hours old
      if (now - data.timestamp < DAY) {
        return data.value;
      }
    }

    // generate new values
    const percentage = Number((Math.random() * 40 - 15).toFixed(2));
    const value = Number(((purchasePrice * percentage) / 100).toFixed(2));

    const result = {
      profit_loss_value: value,
      profit_loss_percent: percentage,
    };

    localStorage.setItem(
      KEY,
      JSON.stringify({ value: result, timestamp: now }),
    );

    return result;
  };

  const handleCheckout = () => {
    setLoading(true);
    console.log("CLICKED SUMMARY: ", cart_summary[0].investment_id);

    try {
      cart_summary.forEach((item) => {
        const isChecked = checkedItems[item.id?.toString()] ?? true; // default true if undefined

        if (!isChecked) return;

        const stock = item.basket === null ? item.stock_wine_vintage : null;
        const basket = item.basket !== null ? item.basket : null;
        const basket_items = Array.isArray(item.basket_items)
          ? item.basket_items
          : [];
        const image = item.basket?.image ?? item.images?.[0] ?? null;

        const portfolioId = uuidv4();

        const { profit_loss_value, profit_loss_percent } = generateProfitLoss(
          portfolioId,
          item.purchase_price,
        );

        const dataEntry = {
          id: portfolioId,
          case_size: item.case_size,
          quantity: item.quantity,
          stock_wine_vintage: stock || null,
          user_investment_wine_vintage: null,
          short_description: item.short_description,
          images: image,
          is_special_volumes: false,
          basket: basket || null,
          basket_items: basket_items,
          is_available: true,
          photo_request: item.photo_request,
          wine_name: item.wine_name,
          fromm: item.fromm,
          purchase_date: item.purchase_date,
          purchase_price: item.purchase_price,
          status: item.status,
          sub_account: item.sub_account,
          bottle_size: item.bottle_size,
          vintage: item.vintage,
          location: item.location,
          alcohol_abv: item.alcohol_abv,
          blend: item.blend,
          grapes: item.grapes,
          ownership: item.ownership,
          winery: item.winery,
          region: item.region,
          grape_variety: item.grape_variety,
          rp_tasting_notes: item.rp_tasting_notes,
          wine_parent: item.wine_parent,
          holding_year: item.holding_year,
          profit_lost: profit_loss_value,
          profit_lost_by_percent: profit_loss_percent,
        };

        const activity_payload: ActivitiesT = {
          id: `activity-buy-${portfolioId}`,
          type: "Trading",
          date: today,
          action: "Buy Request",
          detail: {
            wine_name: item.wine_name,
            status: "Pending",
            vintage: item.vintage,
            quantity: item.quantity,
            case_size: item.case_size,
            purchase_price: item.purchase_price,
            bottle_size: item.bottle_size,
            details_wine: dataEntry,
          },
        };

        addToPortfolio(dataEntry);
        addToActivities(activity_payload);
        removeFromCart(item.id);
        removeFromRare(Number(item.investment_id));
        delete checkedItems[item.id];
      });

      router.replace("/vintage/cart/success");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearActivities();
  };

  useEffect(() => {
    if (cart_summary.length === 0) {
      router.back();
    }
  });

  useEffect(() => {
    console.log("PORTFOLIO: ", portfolio);
  }, [portfolio]);

  return (
    <div className="relative flex flex-col gap-2 h-full  gap-4">
      <div className="w-full flex items-center justify-evenly p-2">
        <div
          id="back"
          onClick={() => router.back()}
          className="cursor-pointer w-20 flex gap-2 items-center"
        >
          <ChevronLeft
            className="cursor-pointer text-white/70"
            size={18}
          ></ChevronLeft>
          <Label className="cursor-pointer" htmlFor="back">
            Back
          </Label>
        </div>
        <CartProgress width={"w-full"} step={2}></CartProgress>
      </div>
      <div className="flex gap-4 w-full cart-review-cont h-[78vh]">
        <div className="flex flex-col w-full max-w-100 card-main-cont gap-4 h-full">
          <Card className="max-w-110 card-card-cont min-w-[300px] w-full">
            <CardContent className="flex flex-col gap-4 p-4">
              <CardHeader className="w-full flex flex-col items-center">
                <CardTitle>
                  <Label variant="h2">Payment Summary</Label>
                </CardTitle>
              </CardHeader>
              <div className="w-full flex flex-col gap-2">
                {summary.map((item, index) => (
                  <div
                    key={index}
                    className={`flex w-full justify-between ${
                      item.title === "Current Investment" && "mt-4"
                    }`}
                  >
                    <Label>{item.title}</Label>
                    <Label className="text-white font-medium">
                      £ {item.value}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-110  card-card-cont min-w-[300px] w-full h-full payment-review-card max-h-80 overflow-y-auto">
            <CardContent className="flex h-full flex-col gap-4 p-4">
              <CardHeader className="w-full flex flex-col items-center">
                <CardTitle>
                  <Label variant="h2">Payment Method</Label>
                </CardTitle>
              </CardHeader>

              <RadioGroup
                value={selectedPayment}
                onValueChange={(value) => {
                  setSelectedPayment(value);

                  setUserDetails((prev) => ({
                    payment_method: prev.payment_method.map((c) => ({
                      ...c,
                      is_default: c.last_code === value,
                    })),
                  }));
                }}
                className="flex flex-col gap-4 "
              >
                {payment_method.map((item, index) => (
                  <div
                    key={index}
                    className={`relative transition ease-in-out border rounded-2xl p-2 py-4 flex w-full items-center gap-3 ${
                      item.is_default
                        ? "border-primary-brown"
                        : "border-transparent"
                    }`}
                  >
                    <RadioGroupItem
                      value={item.last_code}
                      id={`card-${index}`}
                    />
                    <Label htmlFor={`card-${index}`} className="w-full">
                      <div className="flex gap-2 justify-between w-full items-center">
                        <Image
                          src={item.img}
                          width={500}
                          height={500}
                          alt="card"
                          className="w-20 rounded-md h-auto"
                        />
                        <div>
                          <Label
                            htmlFor={`card-${index}`}
                            variant="h2"
                            className="text-white"
                          >
                            **** - **** - {item.last_code}
                          </Label>
                          <Label htmlFor={`card-${index}`}>
                            Exp: {item.exp}
                          </Label>
                        </div>
                        <div className="w-16">
                          {item.is_default && (
                            <Label className="text-blue-500">Default</Label>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Dialog>
                <DialogTrigger className="w-full pb-2">
                  <div className="w-full flex flex-col gap-2 items-center bg-primary-gray-500/50 hover:bg-primary-gray-500/30 p-4 rounded-xl">
                    <Plus className="text-white" />
                    <Label>Add New Payment Method</Label>
                    <Image
                      src="/card-logo.png"
                      alt=""
                      width={500}
                      height={500}
                      className="w-auto h-8"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <CreditCard />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <Card className="h-40 w-full overflow-y-hidden">
            <CardContent className="h-auto p-4">
              <CardHeader className="flex items-center justify-center">
                <CardTitle>
                  <Label variant="h2">Use Balance</Label>
                </CardTitle>
              </CardHeader>
              {account_bal > cart_total ? (
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={(value) => {
                    setSelectedPayment(value);
                    if (value === "account-bal") {
                      setUserDetails((prev) => ({
                        payment_method: prev.payment_method.map((c) => ({
                          ...c,
                          is_default: false,
                        })),
                      }));
                    }
                  }}
                  disabled={cart_total > account_bal ? true : false}
                  className="flex justify-between items-center mt-2"
                >
                  <div
                    className={`flex items-center gap-4 w-full border rounded-2xl p-4 transition ${
                      selectedPayment === "account-bal"
                        ? "border-primary-brown"
                        : "border-transparent"
                    }`}
                  >
                    <RadioGroupItem value="account-bal" id="account-bal" />

                    <Label
                      htmlFor="account-bal"
                      className="w-full cursor-pointer"
                    >
                      <div className="flex w-full flex-col items-end">
                        <Label
                          htmlFor="account-bal"
                          className="text-primary-brown"
                          variant="h2"
                        >
                          £ {account_bal.toLocaleString()}
                        </Label>
                        <Label
                          htmlFor="account-bal"
                          className="text-[12px] font-thin"
                        >
                          Account Balance
                        </Label>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="flex flex-col items-center gap-4 justify-center">
                  <div className="w-full flex justify-between">
                    <div className="w-full flex items-center">
                      <DepositDialog></DepositDialog>
                    </div>
                    <div className="flex w-full items-end flex-col">
                      <Label
                        htmlFor="account-bal"
                        className="text-primary-brown"
                        variant="h2"
                      >
                        £ {account_bal.toLocaleString()}
                      </Label>
                      <Label
                        htmlFor="account-bal"
                        className="text-[12px] font-thin"
                      >
                        Account Balance
                      </Label>
                    </div>
                  </div>
                  <Label className="text-red-500 text-center">
                    Insufficient balance
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="h-full w-full overflow-y-auto">
          <CardContent className="min-h-100 max-h-184 p-4 h-auto overflow-y-auto">
            <SummaryDetailWine></SummaryDetailWine>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4 h-[5%] justify-end">
        <Label variant="h1">Total: £ {initial_total.toLocaleString()}</Label>
        <Button onClick={handleCheckout}>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <Wallet></Wallet>Pay Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
