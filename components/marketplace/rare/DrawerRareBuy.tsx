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
import { WineRareResultsT, WineResultDetailT } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { CartItemT } from "@/lib/types";
import { toast } from "sonner";
import { useSubAccount } from "@/context/SubAccountContext";

export interface DrawerRareT {
  result: WineRareResultsT;
  trigger: React.ReactNode;
  type: string;
  parent: WineRareResultsT;
}

export default function DrawerBuyRare({ result, trigger, type }: DrawerRareT) {
  const { addToCart, cart } = useCart(); // Access the global add function
  const { subAccounts } = useSubAccount()
  const bottle_size = result.wine_vintage_details?.bottle_size ?? "";
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
  const case_size = result.case_size;
  const [selectedVintage, setSelectedVintage] = useState(
    result.wine_vintage_details?.vintage
  );
  const [quantityData, setQuantityData] = useState(1);
  const [selectedCaseSize, setSelectedCaseSize] = useState(
    `${case_size}x${bottle}cl`
  );

  const [caseSize, setCaseSize] = useState(case_size);
  const total = Number(result.market_value) * caseSize * quantityData;

  useEffect(() => {
    setSelectedCaseSize(`${case_size}x${bottle}cl`);
    setCaseSize(case_size);
  }, [selectedVintage]);

  const buildCartItemId = (type: string, id: number, caseSize: number) => {
    return `${type}-${result.investment_id}-${caseSize}`;
  };

  console.log("RESULTS RARE: ", result);

  const handleAddToBasket = () => {
    const newItem: CartItemT = {
      id: buildCartItemId(type, result.investment_id, caseSize),
      case_size: caseSize,
      quantity: quantityData,
      wine_name:
        result.basket_details === null
          ? result.wine_parent?.name ?? ""
          : result.basket_details.name ?? "",
      short_description: "",
      images:
        result.basket_details === null
          ? result.wine_parent?.images ?? ""
          : result.basket_details.image ?? "",
      is_special_volumes: type === "special-volume" || type === "rare",
      is_available: true,
      photo_request: false,
      bottle_size: bottle_size,
      stock_wine_vintage: type !== "special-bundle" ? (result as any) : null,
      basket:
        result.basket_details !== null
          ? {
              id: result.investment_id,
              name:
                result.basket_details === null
                  ? ""
                  : result.basket_details.name ?? "",
              vintage: selectedVintage ?? null,
              quantity: quantityData,
              market_value: Number(result.market_value),
              case_size: caseSize,
              winery: result.basket_details.winery ?? "",
              region: result.basket_details.region ?? "",
              grapes: result.basket_details.grapes ?? "",
              grape_variety: result.basket_details.grape_variety ?? "",
              fromm: "",
              image: result.basket_details.image ?? "",
              special_id: null,
              is_assortment: true,
              bottle_size: bottle_size,
              sub_header: "",
            }
          : null,
      basket_items: result.basket_details !== null ? result.basket_items : null,
      fromm: result.wine_parent?.fromm,
      user_investment_wine_vintage: null,
      purchase_price: 0,
      purchase_date: "",
      status: "",
      location: "portfolio",
      sub_account: subAccounts[0],
      vintage:
        result.basket_details !== null
          ? 0
          : result.wine_vintage_details?.vintage ?? 0,
      alcohol_abv: String(result.wine_parent?.alcohol_abv),
      blend: String(result.wine_parent?.blend),
      grapes: String(result.wine_parent?.grapes),
      ownership: String(result.wine_parent?.ownership),
      winery: result.wine_parent?.winery ?? "",
      region: result.wine_parent?.region ?? "",
      grape_variety: result.wine_parent?.grape_variety ?? "",
      rp_tasting_notes: result.wine_vintage_details?.rp_tasting_notes ?? "",
    };
    console.log("DATA CART: ", newItem);
    addToCart(newItem);
    toast.success("Wine added to cart");
    // location.reload();
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
                {result.basket_details === null && (
                  <DropdownMenuCheckboxItem>
                    {result.basket_details === null &&
                      result.wine_vintage_details?.vintage}
                  </DropdownMenuCheckboxItem>
                )}
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
                {caseSize}x{bottle}cl
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
