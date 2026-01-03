"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";
import { Wallet } from "lucide-react";
import React, { useState } from "react";

export default function Review() {
  const { cart_summary } = useCartSummary();
  const { cart_total, current_investment } = useUserContext();
  const [photoReq, setPhotoReq] = useState(0);

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
      value: cart_total.toLocaleString(),
    },
    {
      title: "Photo Request Total",
      value: photoReq * 16.99,
    },
    {
      title: "Monthly Fee Due",
      value: monthly_fee,
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
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 w-full h-full">
        <Card className="w-150">
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
                  <Label>£ {item.value}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="h-full w-full overflow-y-auto">
          <CardContent className="min-h-100 h-auto">
            <Label>Helo</Label>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4 justify-end">
        <Label variant="h1">Total: £ {initial_total.toLocaleString()}</Label>
        <Button>
          <Wallet></Wallet>Pay Now
        </Button>
      </div>
    </div>
  );
}
