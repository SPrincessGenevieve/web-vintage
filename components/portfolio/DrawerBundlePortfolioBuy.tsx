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
  PortfolioBasketItemT,
  SpecialBundleParentT,
  SpecialBundleT,
  VintexDetailsT,
  VintexResultsT,
} from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { CartItemT } from "@/lib/types";
import { toast } from "sonner";
import { useSubAccount } from "@/context/SubAccountContext";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserContext } from "@/context/UserContext";
import { useCartSummary } from "@/context/CartSummary";
import { useRouter } from "next/navigation";

export interface DrawerBundlePortfolioT {
  trigger: React.ReactNode;
  item: CartItemT;
}

export default function DrawerBundlePortfolioBuy({
  trigger,
  item,
}: DrawerBundlePortfolioT) {
  const { addToCart, setCheckedItems } = useCart(); // Access the global add function
  const { subAccounts } = useSubAccount();
  const bottle_size = item.bottle_size;
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
  const [open, setOpen] = useState(false);
  const [photoRequest, setPhotoRequest] = useState<boolean | null>(null);
  const [quantityData, setQuantityData] = useState(1);
  const [selectedCaseSize, setSelectedCaseSize] = useState(
    `${item.case_size}x${bottle}cl`,
  );
  const { setUserDetails } = useUserContext();
  const { addToCartSummary, clearCartSummary } = useCartSummary();
  const router = useRouter();

  const total =
    Number(item.basket?.market_value) * item.case_size * quantityData;

  const handleAddToBasket = (puchase_type: string, photo_req: boolean) => {
    const portID = uuidv4();
    const today = new Date().toISOString().split("T")[0];
    const newItem: CartItemT = {
      id: portID,
      case_size: item.case_size,
      quantity: quantityData,
      wine_name: item.wine_name,
      short_description: item.basket?.winery ?? "",
      images: item.images,
      is_special_volumes: false,
      is_available: true,
      photo_request: photo_req,
      location: "portfolio",
      stock_wine_vintage: null,
      basket: item.basket,
      basket_items: item.basket_items,
      user_investment_wine_vintage: null,
      fromm: item.fromm,
      purchase_price:
        (item.basket?.market_value ?? 0 * item.case_size) * item.quantity,
      purchase_date: today,
      status: "Buy Request",
      sub_account: subAccounts[0],
      bottle_size: bottle_size,
      vintage: item.basket_items?.[0].wine_vintage.vintage ?? 0,
      alcohol_abv: item.alcohol_abv,
      blend: item.blend,
      grapes: item.grapes,
      ownership: item.ownership,
      winery: item.winery,
      region: item.region,
      grape_variety: item.grape_variety,
      rp_tasting_notes: item.rp_tasting_notes,
      wine_parent: item.wine_parent,
    };

    const newTotal =
      Number(newItem.basket?.market_value) *
      newItem.case_size *
      newItem.quantity;

    if (photo_req) {
      setUserDetails({
        cart_total: newTotal + 16.99,
      });
    } else {
      setUserDetails({
        cart_total: newTotal,
      });
    }

    if (puchase_type === "buy") {
      setOpen(false);
      setUserDetails({
        cart_total: photo_req ? newTotal + 16.99 : newTotal,
      });
      addToCart(newItem);
      setCheckedItems((prev) => ({
        ...prev,
        [newItem.id]: true, // safely update Record<string, boolean>
      }));
      addToCartSummary(newItem);
      router.refresh();
      router.push("/vintage/cart/review");
    } else if (puchase_type === "add") {
      addToCart(newItem);

      toast.success("Wine added to cart");
      location.reload();
    }
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
                  {/* {selectedVintage === 0
                    ? result_item.find((v) => !v.is_unavailable)?.vintage
                    : selectedVintage} */}{" "}
                  ---
                </Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent>
                {result_item.map((item, index) => (
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
              </DropdownMenuContent> */}
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
                <DropdownMenuCheckboxItem>
                  {item.case_size}x{bottle}cl
                </DropdownMenuCheckboxItem>
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
                    handleAddToBasket("buy", false);
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
                    handleAddToBasket("buy", true);
                  }}
                >
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={() => handleAddToBasket("add", false)}>
            Add to Basket
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
