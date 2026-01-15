"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDelivery } from "@/context/DeliveryContext";
import DeliveryTable from "./DeliveryTable";

export default function DeliveryHistoryTable() {
  const router = useRouter();
  const { clearDelivery, delivery } = useDelivery();

  return (
    <Card className="w-full h-full">
      <CardContent className="overflow-auto min-w-[700px]">
        <Label variant="h2">Delivery History</Label>

        <div className="mt-4">
          {delivery.length === 0 ? (
          <div className="pt-4 gap-4 flex flex-col items-center justify-center">
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
              onClick={() => router.push("/vintage/concierge")}
              variant={"outline"}
            >
              Request Wine
            </Button>
            <Label>You don't have any wine deliveries yet</Label>
          </div>
        ) : (
          <div>
            <DeliveryTable></DeliveryTable>
          </div>
        )}
        </div>

        {/* <Button onClick={() => clearDelivery()}>CLEAR HISTORY</Button> */}
      </CardContent>
    </Card>
  );
}
