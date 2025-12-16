'use client'

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function DeliveryHistoryTable() {
  const router = useRouter()

  return (
    <Card className="w-full h-full">
      <CardContent>
        <Label variant="h2">Delivery History</Label>
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
          <Label>We don't have any wine deliveries yet</Label>
          <Button onClick={() => router.push("/vintage/concierge")} variant={"outline"}>Request Wine</Button>
        </div>
      </CardContent>
    </Card>
  );
}
