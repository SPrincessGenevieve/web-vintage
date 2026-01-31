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
import { Card, CardContent } from "../ui/card";

interface SellActivityDetailT {
  item: ActivitiesT;
  img: string;
}

export default function SellActivityDetail({ item, img }: SellActivityDetailT) {
  const { updateActivitiesItem, activities } = useActivities();
  const { updatePortfolioItem } = usePortfolio();
  const activity = activities.find((a) => a.id === item.id);
  const status = item.detail?.status;

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-primary-brown" variant="h1">
        Sell Request
      </Label>
      <div className="flex flex-col gap-2">
        <div
          className={`rounded-2xl border border-primary-brown/30 overflow-hidden bg-black flex items-center justify-center`}
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
              {item.detail?.vintage !== 0 && (
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
              )}
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
                  <Label>Date Requested</Label>
                </TableCell>
                <TableCell>
                  <Label className="text-white font-semibold">
                    {item.date}
                  </Label>
                </TableCell>
              </TableRow>
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
    </div>
  );
}
