"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VintageT } from "@/app/vintage/marketplace/vint-ex/[id]/page";
import {
  SpecialVolumeT,
  VintexDetailsT,
  VintexResultsT,
  WineResultDetailT,
} from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { CartItemT } from "@/lib/types";
import { toast } from "sonner";

export interface DrawerVintageT {
  result: WineResultDetailT;
  result_data: WineResultDetailT[];
  parent_data: SpecialVolumeT;
  bottle_size: string;
  default_case_size_list: number[];
  trigger: React.ReactNode;
  type: string;
}

export default function DrawerBuySpecialVol({
  result,
  bottle_size,
  default_case_size_list,
  result_data,
  parent_data,
  trigger,
  type,
}: DrawerVintageT) {
  const { addToCart } = useCart(); // Access the global add function

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
  const [selectedVintage, setSelectedVintage] = useState(result?.vintage);
  const [quantityData, setQuantityData] = useState(1);
  const [selectedCaseSize, setSelectedCaseSize] = useState(
    result.available_case_size.length > 0
      ? `${result.available_case_size[0]}x${bottle}cl`
      : `${default_case_size_list[0]}x${bottle}cl`
  );
  const parent = parent_data.wine_details;

  const [caseSize, setCaseSize] = useState(
    result.available_case_size.length > 0
      ? result.available_case_size[0]
      : default_case_size_list[0]
  );
  const total = Number(result.market_value) * caseSize * quantityData;

  useEffect(() => {
    setSelectedCaseSize(
      result.available_case_size.length > 0
        ? `${result.available_case_size[0]}x${bottle}cl`
        : `${default_case_size_list[0]}x${bottle}cl`
    );
    setCaseSize(
      result.available_case_size.length > 0
        ? result.available_case_size[0]
        : default_case_size_list[0]
    );
  }, [selectedVintage]);

  const buildCartItemId = (
    type: string,
    result: WineResultDetailT,
    selectedVintage: number,
    caseSize: number
  ) => {
    return `${type}-${result.id}-${selectedVintage}-${caseSize}`;
  };

  const handleAddToBasket = () => {
    const newItem: CartItemT = {
      id: buildCartItemId(type, result, selectedVintage, caseSize),
      case_size: caseSize,
      quantity: quantityData,
      wine_name: result.name,
      short_description: "",
      images: parent.wine_images,
      is_special_volumes: type === "special-volume" || type === "rare",
      is_available: false,
      photo_request: false,
      stock_wine_vintage: type === "vint-ex" ? (result as any) : null,
      basket:
        // type === "special-bundle"
        //   ? {
        //       id: result.id,
        //       name: result.name,
        //       vintage: selectedVintage,
        //       quantity: quantityData,
        //       market_value: Number(result.market_value),
        //       case_size: caseSize,
        //       winery: parent.winery ?? "",
        //       region: parent.region ?? "",
        //       grapes: parent.grapes ?? "",
        //       grape_variety: parent.grape_variety ?? "",
        //       fromm: "",
        //       image: result.images?.[0] ?? "",
        //       special_id: null,
        //       is_assortment: true,
        //       sub_header: result.sub_header ?? "",
        //     }
        //   :
        null,

      user_investment_wine_vintage:
        type === "special-volume" ? ({} as any) : null,
    };

    addToCart(newItem);
    toast.success("Wine added to cart");
  };

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
                <Label>{selectedVintage}</Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {result_data.map((item, index) => (
                  <DropdownMenuCheckboxItem
                    onClick={() => {
                      setSelectedVintage(item.vintage);
                      setSelectedIndex(index);
                    }}
                    key={index}
                  >
                    {item.vintage}
                    {item.is_very_special && <Star></Star>}
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
                {result.available_case_size.length > 0
                  ? result.available_case_size.map((item, index) => (
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
                    ))
                  : default_case_size_list.map((item, index) => (
                      <DropdownMenuCheckboxItem
                        onClick={() =>
                          setSelectedCaseSize(`${item}x${bottle}cl`)
                        }
                        key={index}
                        checked={item === caseSize ? true : false}
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
          <Button onClick={handleAddToBasket}>Add to Basket</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
