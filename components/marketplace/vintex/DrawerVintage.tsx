"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Changed from drawer to sheet
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus, Star, Wine, WineOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VintageT } from "@/app/vintage/marketplace/vint-ex/[id]/page";
import { VintexResultsT } from "@/lib/types";

export interface DrawerVintageT {
  result_data: VintexResultsT[];
  bottle_size: string;
  default_case_size_list: number[];
  trigger: React.ReactNode;
}

export default function DrawerVintage({
  result_data,
  bottle_size,
  default_case_size_list,
  trigger,
}: DrawerVintageT) {
  const bottle =
    bottle_size === "0750"
      ? 75
      : bottle_size === "1500"
      ? 150
      : bottle_size === "3000"
      ? 300
      : bottle_size === "6000"
      ? 600
      : 0;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedVintage, setSelectedVintage] = useState(0);
  const [quantityData, setQuantityData] = useState(1);
  const [selectedCaseSize, setSelectedCaseSize] = useState(
    result_data[selectedIndex].available_case_size.length > 0
      ? `${result_data[selectedIndex].available_case_size[0]}x${bottle}cl`
      : `${default_case_size_list?.[0] ?? 1}x${bottle}cl`
  );
  const [caseSize, setCaseSize] = useState(
    result_data[selectedIndex].available_case_size.length > 0
      ? result_data[selectedIndex].available_case_size[0]
      : default_case_size_list?.[0] ?? 1
  );
  const total =
    Number(result_data[selectedIndex].market_value) * caseSize * quantityData;

  useEffect(() => {
    setSelectedCaseSize(
      result_data[selectedIndex].available_case_size.length > 0
        ? `${result_data[selectedIndex].available_case_size[0]}x${bottle}cl`
        : `${default_case_size_list?.[0] ?? 1}x${bottle}cl`
    );
    setCaseSize(
      result_data[selectedIndex].available_case_size.length > 0
        ? result_data[selectedIndex].available_case_size[0]
        : default_case_size_list?.[0] ?? 1
    );
  }, [selectedVintage]);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      {/* The "side" prop handles the direction */}
      <SheetContent side="right">
        <SheetHeader className="">
          <SheetTitle className="border-b border-primary-brown/70 pb-2">
            Buy Vintage
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <Label className="text-primary-brown">Vintage</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex min-w-32 justify-between gap-2 border border-white/30 rounded-[10px] p-2">
                <Label>
                  {selectedVintage === 0
                    ? result_data.find((v) => !v.is_unavailable)?.vintage
                    : selectedVintage}
                </Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {result_data.map((item, index) => (
                  <DropdownMenuCheckboxItem
                    onClick={() => {
                      setSelectedVintage(item.vintage);
                      setSelectedIndex(index);
                    }}
                    disabled={item.is_unavailable && true}
                    key={index}
                  >
                    {item.vintage}
                    {item.is_very_special && <Star></Star>}
                    {item.is_unavailable && <WineOff></WineOff>}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between">
            <Label className="text-primary-brown">Case Size</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex min-w-32 justify-between gap-2 border border-white/30 rounded-[10px] p-2">
                <Label>{selectedCaseSize}</Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {result_data[selectedIndex].available_case_size.length > 0
                  ? result_data[selectedIndex].available_case_size.map(
                      (item, index) => (
                        <DropdownMenuCheckboxItem
                          checked={item === caseSize ? true : false}
                          onClick={() => {
                            setSelectedCaseSize(`${item}x${bottle}cl`);
                            setCaseSize(item);
                          }}
                          key={index}
                        >
                          {item}x{bottle}cl
                        </DropdownMenuCheckboxItem>
                      )
                    )
                  : (default_case_size_list ?? []).map((item, index) => (
                      <DropdownMenuCheckboxItem
                        key={index}
                        onClick={() =>
                          setSelectedCaseSize(`${item}x${bottle}cl`)
                        }
                      >
                        {item}x{bottle}cl
                      </DropdownMenuCheckboxItem>
                    ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between">
            <Label className="text-primary-brown">Quantity</Label>
            <div className="flex min-w-32 justify-between gap-2 border border-white/30 rounded-[10px] p-2">
              <Button
                disabled={quantityData === 1 && true}
                onClick={() => setQuantityData(quantityData - 1)}
                variant={"ghost"}
                className="p-0 m-0 h-5"
              >
                <Minus color="red"></Minus>
              </Button>
              <Label>{quantityData}</Label>
              <Button
                onClick={() => setQuantityData(quantityData + 1)}
                variant={"ghost"}
                className="p-0 m-0 h-5"
              >
                <Plus className="text-green-600"></Plus>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="text-primary-brown">Market Value</Label>
            <Label variant="h1" className="text-white">
              £{Number(total.toFixed(0)).toLocaleString()}
            </Label>
          </div>
        </div>

        <SheetFooter>
          <Button variant={"outline"}>Buy Now</Button>
          <Button>Add to Basket</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
