"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  EllipsisVertical,
  GiftIcon,
  TextIcon,
  Users,
  Wine,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import GiftDialog from "../portfolio/gift/GiftDialog";
import AssignSubAccount from "../AssignSubAccount/AssignSubAccount";
import { useParams, useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { ActivitiesT, CartItemT } from "@/lib/types";
import { toast } from "sonner";
import { useWineCellar } from "@/context/WineCellarContext";
import { uuidv4 } from "zod";
import GiftDialogBundle from "../portfolio/gift/GiftDialogBundle";
import AssignSubAccountBundle from "../AssignSubAccount/AssignSubAccountBundle";
import { numericId, today } from "@/lib/today";
import { useActivities } from "@/context/ActivitiesContext";

const items = [
  //   {
  //     label: "View Certificate",
  //     icon: TextIcon,
  //   },
  // {
  //   label: "Gift",
  //   icon: GiftIcon,
  // },
  {
    label: "Assign to Sub-account",
    icon: Users,
  },
];

export default function MoreContentWineCellarBundle({
  data,
  profit_loss,
  profit_loss_percent,
}: {
  data: CartItemT;
  profit_loss: number;
  profit_loss_percent: number;
}) {
  const router = useRouter();
  const [select, setSelect] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { addToActivities } = useActivities();
  const params = useParams();
  const id = params.id as string; // {wine}
  const { portfolio, addToPortfolio } = usePortfolio();
  const { removeFromWineCellar, updateWineCellarItem } = useWineCellar();

  const handleGift = () => {
    setOpen(false);
    const activity_payload: ActivitiesT = {
      id: `activity-deliver-bundle-${uuidv4()}`,
      type: "Trading",
      date: today,
      action: "Gift Request",
      gift_email: email,
      detail: {
        wine_name: data.wine_name,
        status: "Pending",
        details_wine: data,
        vintage: data.vintage,
        quantity: data.quantity,
        case_size: data.case_size,
        purchase_price: data.stock_wine_vintage?.market_value ?? 0,
        bottle_size: data.bottle_size,
      },
    };
    addToActivities(activity_payload);
    updateWineCellarItem(data.id, {
      status: "Gift Request", // or whatever your gifted status value is
    });
    toast.success(
      "Your wine has been gifted successfully. Awaiting confirmation from the recipient.",
    );
  };

  const handleCancelGift = () => {
    setOpen(false);
    updateWineCellarItem(data.id, {
      status: "In Bond", // or whatever your gifted status value is
    });
    toast.success("Your gifted wine has been successfully cancelled.");
  };

  const handleAssignToWineCellar = () => {
    addToPortfolio({
      id: data.id,
      case_size: data.case_size,
      quantity: data.quantity,
      stock_wine_vintage: data.stock_wine_vintage,
      user_investment_wine_vintage: null,
      short_description: data.short_description,
      images: data.images,
      is_special_volumes: data.is_special_volumes,
      basket: data.basket,
      basket_items: data.basket_items,
      is_available: data.is_available,
      photo_request: data.photo_request,
      wine_name: data.wine_name,
      fromm: data.fromm,
      purchase_price: data.purchase_price,
      purchase_date: data.purchase_date,
      status: data.status,
      sub_account: data.sub_account,
      location: "portfolio",
      bottle_size: data.bottle_size,
      vintage: data.vintage,
      profit_lost: profit_loss,
      profit_lost_by_percent: profit_loss_percent,
      alcohol_abv: data.alcohol_abv,
      blend: data.blend,
      grapes: data.grapes,
      ownership: data.ownership,
      winery: data.winery,
      region: data.region,
      grape_variety: data.grape_variety,
      rp_tasting_notes: data.rp_tasting_notes,
      wine_parent: data.wine_parent,
    });
    removeFromWineCellar(data.id);
    toast.success("Wine has been successfully moved to Portfolio.");
    router.push("/vintage/portfolio");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <Button className="" variant={"ghost"}>
            <EllipsisVertical></EllipsisVertical>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item, index) => (
            <DropdownMenuItem
              disabled={data.status !== "In Bond"}
              key={index}
              onClick={() => {
                setSelect(item.label);
                setOpen(true);
              }}
            >
              <item.icon className="text-primary-brown"></item.icon>
              <Label className="text-white">
                {data.status === "Gift Request" && item.label === "Gift"
                  ? "Gift Requested"
                  : item.label}
              </Label>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={handleAssignToWineCellar}>
            <TextIcon className="text-primary-brown"></TextIcon>
            <Label className="text-white">Assign to Portfolio</Label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-auto">
          {select === "Gift" && data.status === "Gift Request" ? (
            <div className="flex flex-col gap-4">
              <Label variant="h1">
                Are you sure you want to cancel your gift?
              </Label>
              <div className="w-full flex gap-2 justify-end">
                <Button
                  onClick={handleCancelGift}
                  className="bg-red-700 text-white hover:bg-red-700/50"
                >
                  Yes, cancel
                </Button>
                <Button onClick={() => setOpen(false)} variant={"outline"}>
                  Close
                </Button>
              </div>
            </div>
          ) : select === "Gift" && data.status !== "Gift Request" ? (
            <GiftDialogBundle
              email={email}
              setEmail={(e) => setEmail(e.target.value)}
              gift={handleGift}
              close={() => setOpen(false)}
              data={data}
            ></GiftDialogBundle>
          ) : (
            <></>
          )}
          {select === "Assign to Sub-account" && (
            <AssignSubAccountBundle data={data}></AssignSubAccountBundle>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
