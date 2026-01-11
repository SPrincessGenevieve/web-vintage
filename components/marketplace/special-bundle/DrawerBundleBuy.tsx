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

export interface DrawerBundleT {
  data: SpecialBundleT;
  result_data: PortfolioBasketItemT[];
  parent_data: SpecialBundleParentT;
  bottle_size: string;
  default_case_size_list: number;
  trigger: React.ReactNode;
  type: string;
}

export default function DrawerBundleBuy({
  data,
  bottle_size,
  default_case_size_list,
  result_data,
  parent_data,
  trigger,
  type,
}: DrawerBundleT) {
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
  const [selectedVintage, setSelectedVintage] = useState("---");
  const [quantityData, setQuantityData] = useState(1);
  const [selectedCaseSize, setSelectedCaseSize] = useState(
    `${data.basket_details.case_size}x${bottle}cl`
  );
  const [photoRequest, setPhotoRequest] = useState(false);
  const [open, setOpen] = useState(false);
  const { setUserDetails } = useUserContext();
  const { addToCartSummary, clearCartSummary } = useCartSummary();
  const router = useRouter();

  const total =
    Number(data.basket_details.market_value) *
    default_case_size_list *
    quantityData;

  const buildCartItemId = (type: string, id: number, case_size: number) => {
    return `${type}-${id}`;
  };

  const newItem: CartItemT = {
    id: buildCartItemId(type, data.basket_details.id, default_case_size_list),
    case_size: default_case_size_list,
    quantity: quantityData,
    wine_name: data.basket_details.name,
    short_description: data.basket_details.winery,
    images: data.basket_details.image,
    is_special_volumes: type === "special-volume" || type === "rare",
    is_available: true,
    photo_request: photoRequest,
    location: "portfolio",
    stock_wine_vintage: null,
    basket: {
      id: data.basket_details.id,
      name: data.basket_details.name,
      vintage: null,
      quantity: quantityData,
      market_value: Number(data.basket_details.market_value),
      case_size: data.basket_details.case_size,
      winery: data.basket_details.winery ?? "",
      region: data.basket_details.region ?? "",
      grapes: data.basket_details.grapes ?? "",
      grape_variety: data.basket_details.grape_variety ?? "",
      fromm: parent_data.fromm,
      image: data.basket_details.image ?? "",
      special_id: null,
      is_assortment: true,
      sub_header: data.basket_details.sub_header ?? "",
      bottle_size: bottle_size,
    },
    basket_items: data.results,
    user_investment_wine_vintage: null,
    fromm: parent_data.fromm,
    purchase_price: 0,
    purchase_date: "",
    status: "",
    sub_account: subAccounts[0],
    bottle_size: bottle_size,
    vintage: 0,
    alcohol_abv: "",
    blend: "",
    grapes: "",
    ownership: "",
    winery: parent_data.winery,
    region: parent_data.region,
    grape_variety: parent_data.grape_variety,
    rp_tasting_notes: "",
    wine_parent: parent_data,
  };

  const newTotal =
    Number(newItem.basket?.market_value) * newItem.case_size * newItem.quantity;

  const today = new Date().toISOString().split("T")[0];

  const newItemBuy: CartItemT = {
    id: newItem.id,
    case_size: newItem.case_size,
    quantity: newItem.quantity,
    wine_name: newItem.wine_name,
    short_description: newItem.winery,
    images: newItem.images,
    is_special_volumes: newItem.is_special_volumes,
    is_available: newItem.is_available,
    photo_request: newItem.photo_request,
    stock_wine_vintage: newItem.stock_wine_vintage,
    basket: {
      id: newItem.basket?.id ?? 0,
      name: newItem.basket?.name ?? "",
      vintage: newItem.basket?.vintage ?? 0,
      quantity: newItem.basket?.quantity ?? 0,
      market_value: newItem.basket?.market_value ?? 0,
      case_size: newItem.basket?.case_size ?? 0,
      winery: newItem.basket?.winery ?? "",
      region: newItem.basket?.region ?? "",
      grapes: newItem.basket?.grapes ?? "",
      grape_variety: newItem.basket?.grape_variety ?? "",
      fromm: newItem.basket?.fromm ?? "",
      image: newItem.basket?.image ?? "",
      special_id: newItem.basket?.special_id ?? 0,
      is_assortment: newItem.basket?.is_assortment ?? false,
      sub_header: newItem.basket?.sub_header ?? "",
      bottle_size: newItem.basket?.bottle_size ?? "",
    },
    basket_items: newItem.basket_items,
    user_investment_wine_vintage: newItem.user_investment_wine_vintage,
    fromm: newItem?.basket?.fromm ?? "",
    purchase_price: newTotal,
    purchase_date: today,
    status: "Buy Request",
    location: "portfolio",
    sub_account: subAccounts[0],
    bottle_size: bottle_size,
    vintage: newItem.vintage,
    alcohol_abv: newItem.alcohol_abv,
    blend: newItem.blend,
    grapes: newItem.grapes,
    ownership: newItem.ownership,
    winery: newItem.basket?.winery ?? "",
    region: newItem.basket?.region ?? "",
    grape_variety: newItem.basket?.grape_variety ?? "",
    rp_tasting_notes: newItem.rp_tasting_notes,
    wine_parent: newItem.wine_parent,
  };

  const handleAddToBasket = () => {
    addToCart(newItem);
    console.log("DATA RSULT: ", newItem);
    toast.success("Wine added to cart");
    location.reload();
  };
  
  const handleBuyWine = async () => {
    setOpen(false);
    setUserDetails({
      cart_total: photoRequest ? newTotal + 16.99 : newTotal,
    });
    addToCart(newItem);
    setCheckedItems((prev) => ({
      ...prev,
      [newItem.id]: true, // safely update Record<string, boolean>
    }));
    addToCartSummary(newItemBuy);
    router.refresh(); // ⬅ revalidate server components
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
                  {/* {selectedVintage === 0
                    ? result_data.find((v) => !v.is_unavailable)?.vintage
                    : selectedVintage} */}{" "}
                  ---
                </Label>
                <ChevronDown size={20} color="white"></ChevronDown>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent>
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
                  {data.basket_details.case_size}x{bottle}cl
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
