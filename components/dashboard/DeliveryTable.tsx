"use client";

import React from "react";
import { Table, TableCell, TableHeader, TableRow } from "../ui/table";
import { Label } from "../ui/label";
import { useDelivery } from "@/context/DeliveryContext";
import Image from "next/image";
import { Dot } from "lucide-react";

export default function DeliveryTable() {
  const { delivery } = useDelivery();
  const header = ["Wine", "Fee", "Address", "Status"];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-primary-brown/30">
          {header.map((item) => (
            <TableCell>
              <div>
                <Label className="text-white font-semibold">{item}</Label>
              </div>
            </TableCell>
          ))}
        </TableRow>
        {delivery.map((item, index) => {
          const imgSrc = Array.isArray(item.wine.images)
            ? item.wine.images[0]
            : item.wine.images;
          const bottle = item.wine.bottle_size;
          const bottle_size =
            bottle === "0750"
              ? 75
              : bottle === "1500"
              ? 150
              : bottle === "3000"
              ? 300
              : bottle === "6000"
              ? 600
              : 0;

          return (
            <TableRow className={`border-primary-brown/30`} key={index}>
              <TableCell className="w-100">
                <div className="flex  gap-2">
                  <div className="w-30 rounded-2xl">
                    <Image
                      src={imgSrc}
                      width={400}
                      height={400}
                      className="w-auto h-25 object-contain rounded-2xl"
                      alt=""
                    ></Image>
                  </div>
                  <div className="flex items-start flex-col justify-start w-90">
                    <Label className="text-wrap text-white" variant="h2">
                      {item.wine.wine_parent.name}
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Label className="text-wrap ">
                        {item.wine.vintage === 0 ? "" : item.wine.vintage}
                      </Label>
                      {item.wine.vintage !== 0 && <Dot color="white"></Dot>}
                      <Label className="text-wrap ">
                        {item.wine.case_size}x{bottle_size}cl
                      </Label>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Label>£ {Number(item.fee.toFixed()).toLocaleString()}</Label>
              </TableCell>
              <TableCell>
                <Label>{item.address_1}</Label>
              </TableCell>
              <TableCell>
                <div className="bg-orange-700 flex p-1 rounded-full px-2 items-center justify-center text-white font-medium text-center">
                  <Label className="text-white font-semibold">
                    {item.status === "Pending" ? "Requested" : item.status}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableHeader>
    </Table>
  );
}
