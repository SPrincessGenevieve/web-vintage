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
import { useWineCellar } from "@/context/WineCellarContext";
import { Card, CardContent } from "../ui/card";

interface DeliverActivityDetailT {
  item: ActivitiesT;
  img: string;
}

export default function DeliverActivityDetail({
  item,
  img,
}: DeliverActivityDetailT) {
  const { updateActivitiesItem, activities } = useActivities();
  const { updateWineCellarItem } = useWineCellar();
  const activity = activities.find((a) => a.id === item.id);
  const status = item.detail?.status;

  const handleCancel = () => {
    toast.success("Deliver request was cancelled successfuly.");
    if (!activity?.detail) return; // guard clause
    updateWineCellarItem(item.detail?.details_wine?.id ?? "", {
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

  const detail = item.delivery_detail?.detail;

  const header_detail = [
    {
      title: "Vintage",
      value: item.detail?.vintage,
    },
    {
      title: "Purchase Price",
      value: `£ ${item.detail?.purchase_price.toLocaleString()}`,
    },
    {
      title: "Quantity",
      value: item.detail?.quantity,
    },
    {
      title: "Case Size",
      value: item.detail?.case_size,
    },
    {
      title: "Date Request",
      value: item.date,
    },
    {
      title: "Date Cancelled",
      value: item.date_cancelled,
    },
    {
      title: "Status",
      value: item.detail?.status,
    },
  ];

  const content_data = [
    {
      title: "Name",
      value: `${detail?.first_name} ${detail?.last_name}`,
    },
    {
      title: "Tel/Phone No.",
      value: detail?.phone,
    },
    {
      title: "Email",
      value: detail?.email,
    },
    {
      title: "Address 1",
      value: item.delivery_detail?.address_1,
    },
    {
      title: "Address 2",
      value: item.delivery_detail?.address_2,
    },
    {
      title: "Town/County",
      value: detail?.town_county === "" ? "---" : detail?.town_county,
    },
    {
      title: "Country",
      value: detail?.country,
    },
    {
      title: "Postal Code",
      value: detail?.postal_code,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-primary-brown" variant="h1">
        Deliver Request
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
          <Card className="bg-primary-gray-500">
            <CardContent className="bg-transparent">
              <div className="rounded-xl overflow-hidden">
                <Table>
                  <TableBody>
                    {header_detail.map(
                      (item, i) =>
                        item.value !== "" &&
                        item.title !== "Date Cancelled" &&
                        item.value !== 0 && (
                          <TableRow className="border-none">
                            <TableCell>
                              <Label>{item.title}</Label>
                            </TableCell>
                            <TableCell>
                              <div className="w-full flex justify-end items-center">
                                <Label className={`px-2 rounded-2xl ${item.value === "Complete" ? "text-white bg-green-600" : "text-white"} font-semibold`}>
                                  {item.value}
                                </Label>
                              </div>
                            </TableCell>
                          </TableRow>
                        ),
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
          <Label variant="h2" className="text-white">
            Delivery Details
          </Label>
          <Card className="bg-primary-gray-500">
            <CardContent className="bg-transparent">
              <Table>
                <TableBody>
                  {content_data.map((item, i) => (
                    <TableRow key={i} className="border-primary-brown/30">
                      <TableCell>
                        <Label variant="p" className="text-white/50">
                          {item.title}
                        </Label>
                        <Label className="font-semibold text-white">
                          {item.value}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
