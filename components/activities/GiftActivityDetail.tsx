"use client";

import React from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ActivitiesT } from "@/lib/types";
import { useActivities } from "@/context/ActivitiesContext";
import { toast } from "sonner";
import { usePortfolio } from "@/context/PortfolioContext";
import { today } from "@/lib/today";

interface GiftActivityDetailT {
  item: ActivitiesT;
  img: string;
}

export default function GiftActivityDetail({ item, img }: GiftActivityDetailT) {
  const { updateActivitiesItem, activities } = useActivities();
  const { updatePortfolioItem } = usePortfolio();
  const activity = activities.find((a) => a.id === item.id);
  const status = item.detail?.status;

  const handleCancel = () => {
    toast.success("Gift request was cancelled successfuly.");
    if (!activity?.detail) return; // guard clause
    updatePortfolioItem(item.detail?.details_wine?.id ?? "", {
      status: "In Bond",
    });
    updateActivitiesItem(item.id, {
      date_cancelled: today,
      detail: {
        ...activity.detail, // now TS knows it's defined
        status: "Cancelled",
      },
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Label className="text-primary-brown" variant="h1">
        Gift Request
      </Label>
      <div className="flex flex-col gap-2">
        <div
          className={`rounded-2xl border border-primary-brown/30 overflow-hidden ${item.detail?.details_wine?.basket === null ? "" : "bg-black"} flex items-center justify-center`}
        >
          <Image
            src={img}
            alt=""
            className="max-h-45 object-contain rounded-2xl"
            width={400}
            height={400}
          ></Image>
        </div>
        <div className="flex">
          <Label variant="h2" className="text-white">
            {item.detail?.wine_name}
          </Label>
        </div>
        <div>
          <Table>
            <TableBody>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Vintage</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.detail?.vintage}
                  </Label>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Purchase Price</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    £ {item.detail?.purchase_price.toLocaleString()}
                  </Label>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Quantity</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.detail?.quantity}
                  </Label>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Case Size</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.detail?.case_size}
                  </Label>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Gifted to</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.gift_email}
                  </Label>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Date Requested</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.date}
                  </Label>
                </TableCell>
              </TableRow>
              {status === "Cancelled" && (
                <TableRow className="border-primary-brown/30">
                  <TableCell>
                    <Label>Date Cancelled</Label>
                  </TableCell>
                  <TableCell>
                    <Label className="text-white font-semibold">
                      {item.date_cancelled}
                    </Label>
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  <Label>Status</Label>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Label
                      className={`${status === "Cancelled" ? "bg-red-600" : status === "Pending" ? "bg-blue-700" : "bg-green-500"} px-2 rounded-full text-white font-semibold`}
                    >
                      {item.detail?.status}
                    </Label>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {status !== "Cancelled" && (
        <div className="w-full flex items-center justify-end gap-2">
          <Button
            onClick={handleCancel}
            variant={"outline"}
            className="border-red-800 text-red-500 hover:bg-red-800 hover:text-white"
          >
            Cancel Gift Request
          </Button>
        </div>
      )}
    </div>
  );
}
