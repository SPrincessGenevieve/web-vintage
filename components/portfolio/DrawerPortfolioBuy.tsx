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
import { useSubAccount } from "@/context/SubAccountContext";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";
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
import { v4 as uuidv4 } from "uuid";

export interface DrawerVintageT {
  item: CartItemT;
  bottle_size: string;
  trigger: React.ReactNode;
  type: string;
}

export const generateHoldingYear = (id: string) => {
  const KEY = `holding_year_${id}`;
  const now = Date.now();
  const DAY = 1000 * 60 * 60 * 24;

  const cached = localStorage.getItem(KEY);

  if (cached) {
    const { value, timestamp } = JSON.parse(cached);
    if (now - timestamp < DAY) return value;
  }

  // SINGLE number only
  const year = Math.floor(Math.random() * 10) + 1;

  localStorage.setItem(KEY, JSON.stringify({ value: year, timestamp: now }));

  return year;
};

export default function DrawerPortfolioBuy({
  item,
  bottle_size,
  trigger,
  type,
}: DrawerVintageT) {
  const { addToCart, setCheckedItems } = useCart(); // Access the global add function
  const { addToCartSummary, clearCartSummary } = useCartSummary();
  const router = useRouter();

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
  const [photoRequest, setPhotoRequest] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const { setUserDetails } = useUserContext();
  const [selectedVintage, setSelectedVintage] = useState(item?.vintage);
  const [quantityData, setQuantityData] = useState(1);

  const parent = item.wine_parent;

  const caseSize = item.case_size;
  const total =
    Number(item.stock_wine_vintage?.market_value) * caseSize * quantityData;

  const id = uuidv4();
  const newItem: CartItemT = {
    id: `rare-${id}`,
    case_size: caseSize,
    quantity: quantityData,
    location: "portfolio",
    wine_name: item.wine_name,
    short_description: "",
    images: parent.images,
    is_special_volumes: false,
    is_available: false,
    photo_request: photoRequest === true ? true : false,
    stock_wine_vintage: item.stock_wine_vintage,
    basket: null,
    basket_items: null,
    fromm: parent.fromm,
    user_investment_wine_vintage: null,
    purchase_price: 0,
    purchase_date: "",
    status: "",
    sub_account: subAccounts[0],
    bottle_size: bottle_size,
    vintage: item.vintage,
    alcohol_abv: parent.alcohol_abv ?? "",
    blend: parent.blend ?? "",
    grapes: parent.grapes ?? "",
    ownership: parent.ownership ?? "",
    winery: parent.winery ?? "",
    region: parent.region ?? "",
    grape_variety: parent.grape_variety ?? "",
    rp_tasting_notes: item.rp_tasting_notes ?? "",
    wine_parent: parent,
  };

  const newTotal =
    Number(newItem.stock_wine_vintage?.market_value) *
    newItem.case_size *
    newItem.quantity;

  const today = new Date().toISOString().split("T")[0];

  const handleAddToBasket = () => {
    addToCart(newItem);
    toast.success("Wine added to cart");
    location.reload();
  };

  const handleBuyWine = (photo_req: boolean) => {
    console.log("BUY WINE");
    setPhotoRequest(photo_req);
    setOpen(!open);
    if (photo_req) {
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
      photo_request: photo_req,
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
                <Label>{selectedVintage}</Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <div className="flex justify-between">
            <Label className="text-primary-brown">Case Size</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex min-w-32 justify-between gap-2 border border-white/30 rounded-[10px] p-2">
                <Label>
                  {item.case_size}x{bottle}cl
                </Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
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
                    handleBuyWine(false);
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
                    handleBuyWine(true);
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
