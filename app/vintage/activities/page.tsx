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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActivities } from "@/context/ActivitiesContext";
import { CreditCard, Ellipsis, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Activities() {
  const tabs = ["General", "Trading"];
  const [openGeneral, setOpenGeneral] = useState<string | number>("");
  const [openTrading, setOpenTrading] = useState<string | number>("");
  const { activities, clearActivities } = useActivities();
  const [activeTab, setActiveTab] = useState("General");
  const header_trad = [
    "Wine",
    "Status",
    "Vintage",
    "Quantity",
    "Case Size",
    "Purchased Price",
    "Date",
    "Action",
  ];
  const header_gen = ["Action", "Amount", "Date", "Type", "Status"];
  const gen_data = activities.filter((item) => item.type === "General");
  const trad_data = activities.filter((item) => item.type === "Trading");

  const handleClear = () => {
    clearActivities();
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* <Button onClick={handleClear}>CLEAR</Button> */}
      <div className="flex">
        <div className="bg-primary-gray-500 p-2 rounded-2xl">
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
        <CardContent className="p-4">
          <Label></Label>
          <div>
            {activeTab === "Trading" ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-primary-brown/30">
                    {header_trad.map((item, i) => (
                      <TableCell>
                        <div
                          className={`w-full ${item !== "Wine" ? "flex items-center justify-center" : ""}`}
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
                  {trad_data.map((item, i) => (
                    <>
                      <TableRow
                        key={i}
                        onClick={() => setOpenTrading(item.id)}
                        className="border-primary-brown/30"
                      >
                        <TableCell>
                          <Label>{item.detail?.wine_name}</Label>
                        </TableCell>
                        <TableCell>
                          <div className="w-full flex items-center justify-center">
                            <Label>{item.detail?.status}</Label>
                          </div>
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
                              £ {item.detail?.purchase_price.toLocaleString()}
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
                            <Label>{item.action}</Label>
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
              <Table>
                <TableHeader>
                  <TableRow className="border-primary-brown/30">
                    {header_gen.map((item, i) => (
                      <TableCell key={i}>
                        <div className={`w-full`}>
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
                          <Label>{item.depost_detail?.deposit_status}</Label>
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
