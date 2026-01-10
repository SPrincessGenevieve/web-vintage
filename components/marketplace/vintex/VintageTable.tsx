"use client";

import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserContext } from "@/context/UserContext";
import { VintexResultsT } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface VintageTableT {
  data: VintexResultsT[];
  case_size: number;
  bottle_size: string;
  id: string;
  parent_wine_name: string;
}

export default function VintageTable({
  data,
  case_size,
  bottle_size,
  id,
  parent_wine_name,
}: VintageTableT) {
  const { vintage_table_detail, setUserDetails } = useUserContext();
  const router = useRouter();

  const bottle =
    bottle_size === "0750"
      ? 75
      : bottle_size === "1500"
      ? 150
      : bottle_size === "3000"
      ? 300
      : bottle_size === "6000"
      ? 600
      : 75;

  const handleVintageDetail = ( wine_id: number, vintage: number) => {
    console.log("VINTAGE: ", wine_id)
    router.push(`/vintage/marketplace/vint-ex/${id}/${wine_id}/${vintage}`);
  };

  const header = ["Vintage", "Score", `£ (${case_size}x${bottle}cl)`, "Perf."];
  return (
    <div className="p-4">
      <Table>
        <TableHeader className="border-b border-primary-brown/30">
          {header.map((item, index) => (
            <TableCell key={index}>
              <div className="w-full flex items-center justify-center">
                <Label className="text-white font-semibold">{item}</Label>
              </div>
            </TableCell>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              onClick={() => handleVintageDetail(item.id, item.vintage)}
              key={index}
              className={`border-b border-primary-brown/30 ${
                item.is_unavailable && "opacity-30"
              }`}
            >
              <TableCell>
                <div className="w-full flex justify-center">
                  <Label>{item.vintage}</Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-full flex justify-center">
                  <Label>{item.rp_score}</Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="w-full flex justify-center">
                  <Label>
                    £
                    {(
                      (Number(item.market_value) /
                        Number(item.processed_case)) *
                      Number(case_size)
                    )
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex">
                  <div className="w-full flex justify-center">
                    <Label
                      className={`${
                        Number(item.release_price) > 0
                          ? "text-green-500"
                          : "text-red-600"
                      } text-right`}
                    >
                      {item.release_price
                        ? `${Number(item.release_price) > 0 ? "+" : ""}${Number(
                            item.release_price
                          ).toLocaleString()}%`
                        : ""}
                    </Label>
                  </div>
                  <div>
                    <ChevronRight color="white" size={20}></ChevronRight>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
