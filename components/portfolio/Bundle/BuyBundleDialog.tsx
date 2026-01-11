"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CartItemT } from "@/lib/types";

export default function BuyDialog({ item }: { item: CartItemT }) {
  return (
    <Dialog>
      <DialogTrigger disabled={item.status !== "In Bond" ? true : false} className="w-full">
        <Button
          disabled={item.status !== "In Bond" ? true : false}
          className="border-2 border-primary-brown hover:border-primary-brown  w-full"
        >
          Buy
        </Button>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
