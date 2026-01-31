"use client";
import GeneralDialog from "@/components/activities/GeneralDialog";
import TradingDialog from "@/components/activities/TradingDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActivities } from "@/context/ActivitiesContext";
import { ActivitiesDetailT } from "@/lib/types";
import {
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Activities() {
  const tabs = ["General", "Trading"];
  const [openGeneral, setOpenGeneral] = useState<string | number>("");
  const [openTrading, setOpenTrading] = useState<string | number>("");
  const { activities, clearActivities, updateActivitiesItem } = useActivities();
  const [activeTab, setActiveTab] = useState("General");
  const header_trad = [
    "Wine",
    "Vintage",
    "Quantity",
    "Case Size",
    "Purchased Price",
    "Date",
    "Status",
    "Action",
  ];
  const header_gen = ["Action", "Amount", "Date", "Type", "Status"];
  const gen_data = activities.filter((item) => item.type === "General");
  const trad_data = activities.filter((item) => item.type === "Trading");

  const handleClear = () => {
    clearActivities();
  };

  const stats = [
    "Sell Request",
    "Buy Request",
    "Gift Request",
    "Deliver Request",
  ];

  const statusClassMap: Record<string, string> = {
    Complete: "bg-green-600",
    Pending: "bg-blue-600",
    Failed: "bg-red-600",
    Cancelled: "bg-red-900",
    Requested: "bg-orange-700",
  };

  const actionClassMap: Record<string, string> = {
    "In Bond": "border-amber-200 text-amber-200",
    "Buy Request": "border-primary-brown text-primary-brown",
    "Deliver Request": "border-yellow-600 text-yellow-600",
    "Gift Request": "border-pink-600 text-pink-600",
    "Sell Request": "border-purple-300 text-purple-300",
    "Awaiting Arrival": "border-red-700 text-red-500",
  };

  const activity_trad = activities.filter((item) => item.type === "Trading");
  const buy_req = activity_trad.filter((item) => item.action === "Buy Request");
  const await_ar = activity_trad.filter(
    (item) => item.action === "Awaiting Arrival",
  );

  console.log("BUY REQ", activity_trad);
  useEffect(() => {
    buy_req.forEach((item) =>
      setTimeout(() => {
        updateActivitiesItem(item.id, { action: "Awaiting Arrival" });
      }, 3000),
    );

    await_ar.forEach((item, index) =>
      setTimeout(() => {
        updateActivitiesItem(item.id, {
          action: "In Bond",
          detail: {
            ...item.detail, // merge all existing fields
            status: "Complete", // update only status
          },
        });
      }, 3000 * index),
    );
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      {/* <Button onClick={handleClear}>CLEAR</Button> */}
      <div className="flex">
        <div className="bg-primary-gray-400/70 p-2  rounded-2xl">
          {tabs.map((item, i) => (
            <Button
              onClick={() => setActiveTab(item)}
              variant={activeTab === item ? "default" : "ghost"}
              key={i}
              className="h-8"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Card className="w-full h-[95%]">
        <CardContent className="p-4 w-full h-full">
          <Label></Label>
          <div className="w-full h-full">
            {activeTab === "Trading" ? (
              trad_data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-primary-brown/30">
                      <TableCell>
                        <div>
                          <Label>#</Label>
                        </div>
                      </TableCell>
                      {header_trad.map((item, i) => (
                        <>
                          <TableCell>
                            <div
                              className={`w-full ${item !== "Wine" ? "flex items-center justify-center" : ""}`}
                            >
                              {item === "Status" ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger className="flex gap-2">
                                    <Label className="font-semibold text-white">
                                      {item}
                                    </Label>
                                    <ChevronsUpDown
                                      className="text-primary-brown"
                                      size={18}
                                    ></ChevronsUpDown>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent></DropdownMenuContent>
                                </DropdownMenu>
                              ) : (
                                <>
                                  <Label className="font-semibold text-white">
                                    {item}
                                  </Label>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trad_data.map((item, i) => (
                      <>
                        <TableRow
                          key={i}
                          onClick={() => setOpenTrading(item.id)}
                          className="border-primary-brown/30"
                        >
                          <TableCell>
                            <Label>{i + 1}</Label>
                          </TableCell>
                          <TableCell>
                            <Label>{item.detail?.wine_name}</Label>
                          </TableCell>

                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label>
                                {item.detail?.vintage === 0
                                  ? "---"
                                  : item.detail?.vintage}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label>{item.detail?.quantity}</Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label>{item.detail?.case_size}</Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label>
                                £{" "}
                                {(
                                  item.detail?.purchase_price ?? 0
                                ).toLocaleString()}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label>{item.date}</Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-center">
                              <Label
                                className={`border px-2 rounded-2xl ${actionClassMap[item.action ?? ""] ?? ""}`}
                              >
                                {item.action}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex w-full items-center justify-center">
                              <Label
                                className={`rounded-2xl px-2 font-semibold text-white ${statusClassMap[item.detail?.status ?? ""] ?? ""}`}
                              >
                                {item.detail?.status}
                              </Label>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TradingDialog
                          open={openTrading === item.id ? true : false}
                          onOpenChange={(open) => {
                            if (!open) setOpenTrading("");
                          }}
                          item={item}
                        ></TradingDialog>
                      </>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Label>No available data to show</Label>
                </div>
              )
            ) : gen_data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-primary-brown/30">
                    <TableCell>
                      <div>
                        <Label>#</Label>
                      </div>
                    </TableCell>
                    {header_gen.map((item, i) => (
                      <TableCell key={i}>
                        <div
                          className={`w-full ${item === "Status" ? "flex items-center justify-center" : ""}`}
                        >
                          <Label className="font-semibold text-white">
                            {item}
                          </Label>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gen_data.map((item, i) => (
                    <>
                      <TableRow
                        onClick={() => setOpenGeneral(item.id)}
                        className="border-primary-brown/30"
                        key={i}
                      >
                        <TableCell>
                          <Label>{i + 1}</Label>
                        </TableCell>
                        <TableCell>
                          <Label>{item.action}</Label>
                        </TableCell>
                        <TableCell>
                          <Label>
                            £{" "}
                            {item.depost_detail?.deposit_amount.toLocaleString()}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label>{item.date}</Label>
                        </TableCell>
                        <TableCell>
                          <Label className="capitalize">
                            {item.depost_detail?.deposit_type}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <div className="flex w-full items-center justify-center">
                            <Label
                              className={`rounded-2xl px-2 font-semibold text-white ${statusClassMap[item.depost_detail?.deposit_status ?? ""] ?? ""}`}
                            >
                              {item.depost_detail?.deposit_status}
                            </Label>
                          </div>
                        </TableCell>
                      </TableRow>
                      <GeneralDialog
                        open={openGeneral === item.id ? true : false}
                        onOpenChange={(open) => {
                          if (!open) setOpenGeneral("");
                        }}
                        item={item}
                      ></GeneralDialog>
                    </>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Label>No available data to show</Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
