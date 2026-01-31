"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ActivitiesT } from "@/lib/types";
import { Label } from "../ui/label";
import Image from "next/image";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import GiftActivityDetail from "./GiftActivityDetail";
import SellActivityDetail from "./SellActivityDetail";
import BuyActivityDetail from "./BuyActivityDetail";
import DeliverActivityDetail from "./DeliverActivityDetail";

interface GeneralT {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  item: ActivitiesT;
}

export default function TradingDialog({ open, onOpenChange, item }: GeneralT) {
  const [contentDetail, setContentDetail] = useState(item.action);
  const [img, setImg] = useState<any>("");

  useEffect(() => {
    const detailsWine = item.detail?.details_wine;
    let imgSrc = "";

    if (detailsWine) {
      if (Array.isArray(detailsWine.images) && detailsWine.images.length > 0) {
        imgSrc = detailsWine.images[0]; // first image from array
      } else if (typeof detailsWine.images === "string") {
        imgSrc = detailsWine.images; // single string
      } else {
        imgSrc = ""; // fallback
      }
    }

    setImg(imgSrc);
  }, [item.detail]);

  function Content() {
    switch (contentDetail) {
      case "Buy Request":
        return <BuyActivityDetail item={item} img={img}></BuyActivityDetail>;
      case "In Bond":
        return <BuyActivityDetail item={item} img={img}></BuyActivityDetail>;
      case "Sell Request":
        return <SellActivityDetail item={item} img={img}></SellActivityDetail>;
      case "Deliver Request":
        return (
          <DeliverActivityDetail item={item} img={img}></DeliverActivityDetail>
        );
      case "Gift Request":
        return <GiftActivityDetail item={item} img={img}></GiftActivityDetail>;
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <Content></Content>
      </DialogContent>
    </Dialog>
  );
}
