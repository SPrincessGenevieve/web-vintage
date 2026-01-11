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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VintageT } from "@/app/vintage/marketplace/vint-ex/[id]/page";
import { VintexDetailsT, VintexResultsT } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { CartItemT } from "@/lib/types";
import { toast } from "sonner";
import { useSubAccount } from "@/context/SubAccountContext";
import { useUserContext } from "@/context/UserContext";
import { useCartSummary } from "@/context/CartSummary";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateHoldingYear } from "../special-volume/DrawerBuy";

export interface DrawerVintageT {
  result: VintexResultsT;
  result_data: VintexResultsT[];
  parent_data: VintexDetailsT;
  bottle_size: string;
  default_case_size_list: number[];
  trigger: React.ReactNode;
  type: string;
}

export default function DrawerBuy({
  result,
  bottle_size,
  default_case_size_list,
  result_data,
  parent_data,
  trigger,
  type,
}: DrawerVintageT) {
  const { addToCart, setCheckedItems } = useCart(); // Access the global add function
  const { subAccounts } = useSubAccount();
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
  const [photoRequest, setPhotoRequest] = useState(false);
  const [open, setOpen] = useState(false);
  const { setUserDetails } = useUserContext();
  const { addToCartSummary, clearCartSummary } = useCartSummary();
  const router = useRouter();

  const [selectedCaseSize, setSelectedCaseSize] = useState(
    Array.isArray(result?.available_case_size) &&
      result.available_case_size.length > 0
      ? `${result.available_case_size[0]}x${bottle}cl`
      : `${default_case_size_list?.[0] ?? 1}x${bottle}cl`
  );

  const [caseSize, setCaseSize] = useState(
    Array.isArray(result?.available_case_size) &&
      result.available_case_size.length > 0
      ? result.available_case_size[0]
      : default_case_size_list?.[0] ?? 1
  );

  const parent = parent_data.wine_details;
  const total = Number(result?.market_value) * caseSize * quantityData;

  useEffect(() => {
    const caseSizes = Array.isArray(result?.available_case_size)
      ? result.available_case_size
      : [];

    setSelectedCaseSize(
      caseSizes.length > 0
        ? `${caseSizes[0]}x${bottle}cl`
        : `${default_case_size_list?.[0] ?? 1}x${bottle}cl`
    );

    setCaseSize(
      caseSizes.length > 0 ? caseSizes[0] : default_case_size_list?.[0] ?? 1
    );
  }, [selectedVintage, result, bottle, default_case_size_list]);

  const buildCartItemId = () => crypto.randomUUID();

  const newItem: CartItemT = {
    id: buildCartItemId(),
    case_size: caseSize,
    quantity: quantityData,
    wine_name: result.name,
    location: "portfolio",
    short_description: "",
    images: parent_data.wine_details.images,
    is_special_volumes: false,
    is_available: true,
    photo_request: false,
    stock_wine_vintage: type !== "special-bundle" ? (result as any) : null,
    basket: null,
    basket_items: null,
    fromm: parent_data.wine_details.fromm,
    user_investment_wine_vintage: null,
    purchase_price: 0,
    purchase_date: "",
    status: "",
    sub_account: subAccounts[0],
    bottle_size: bottle_size,
    vintage: result.vintage,
    alcohol_abv: parent_data.wine_details.alcohol_abv ?? "",
    blend: parent_data.wine_details.blend ?? "",
    grapes: parent_data.wine_details.grapes ?? "",
    ownership: parent_data.wine_details.ownership ?? "",
    winery: parent_data.wine_details.winery ?? "",
    region: parent_data.wine_details.region ?? "",
    grape_variety: parent_data.wine_details.grape_variety ?? "",
    rp_tasting_notes: result.rp_tasting_notes ?? "",
    wine_parent: parent_data.wine_details,
  };

  const newTotal =
    Number(newItem.stock_wine_vintage?.market_value) *
    newItem.case_size *
    newItem.quantity;

  const today = new Date().toISOString().split("T")[0];

  const newItemBuy: CartItemT = {
    id: newItem.id,
    case_size: newItem.case_size,
    quantity: newItem.quantity,
    stock_wine_vintage: newItem.stock_wine_vintage,
    user_investment_wine_vintage: newItem.user_investment_wine_vintage,
    short_description: newItem.short_description,
    images: newItem.images,
    is_special_volumes: false,
    basket: newItem.basket,
    basket_items: newItem.basket_items,
    is_available: true,
    photo_request: photoRequest,
    wine_name: newItem.wine_name,
    fromm: newItem.fromm,
    purchase_date: today,
    purchase_price: newTotal,
    status: "Buy Request",
    sub_account: subAccounts[0],
    location: "portfolio",
    bottle_size: newItem.bottle_size,
    vintage: newItem.vintage,
    alcohol_abv: newItem.alcohol_abv,
    blend: newItem.blend,
    grapes: newItem.grapes,
    ownership: newItem.ownership,
    winery: newItem.winery,
    region: newItem.region,
    grape_variety: newItem.grape_variety,
    rp_tasting_notes: newItem.rp_tasting_notes,
    wine_parent: newItem.wine_parent,
    holding_year: generateHoldingYear(String(newItem.id)),
  };

  const handleAddToBasket = () => {
    if (result?.is_unavailable) return;
    addToCart(newItem);
    setCheckedItems((prev) => ({
      ...prev,
      [newItem.id]: true, // safely update Record<string, boolean>
    }));
    toast.success("Wine added to cart");
    location.reload();
  };

  const handleBuyWine = () => {
    console.log("BUY WINE");
    setOpen(!open);
    if (photoRequest) {
      setUserDetails({
        cart_total: newTotal + 16.99,
      });
    } else {
      setUserDetails({
        cart_total: newTotal,
      });
    }

    addToCart(newItem);
    setCheckedItems((prev) => ({
      ...prev,
      [newItem.id]: true, // safely update Record<string, boolean>
    }));
    addToCartSummary(newItemBuy);
    router.push("/vintage/cart/review");
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
                {Array.isArray(result?.available_case_size) &&
                result.available_case_size.length > 0 ? (
                  result.available_case_size.map((item, index) => (
                    <DropdownMenuCheckboxItem
                      checked={item === caseSize}
                      key={index}
                      onCheckedChange={() => setCaseSize(item)}
                    >
                      {item}
                    </DropdownMenuCheckboxItem>
                  ))
                ) : (
                  <DropdownMenuLabel className="text-gray-400">
                    No case sizes available
                  </DropdownMenuLabel>
                )}
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
              <Button className="w-full" variant={"outline"}>
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Would like to request photo on your wine purchase?
                </DialogTitle>
                <DialogDescription className="flex w-full gap-2">
                  <Label>Photo Request Fee:</Label>
                  <Label className="font-semibold text-green-500">
                    £ 16.99
                  </Label>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setPhotoRequest(false);
                    handleBuyWine();
                  }}
                  className="w-32"
                  variant={"outline"}
                >
                  No
                </Button>

                <Button
                  className="w-32"
                  onClick={() => {
                    setPhotoRequest(true);
                    handleBuyWine();
                  }}
                >
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleAddToBasket}>Add to Basket</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
