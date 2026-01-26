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
import GiftDialog from "./gift/GiftDialog";
import AssignSubAccount from "../AssignSubAccount/AssignSubAccount";
import { useParams, useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { ActivitiesT, CartItemT } from "@/lib/types";
import { toast } from "sonner";
import { useWineCellar } from "@/context/WineCellarContext";
import { uuidv4 } from "zod";
import GiftDialogBundle from "./gift/GiftDialogBundle";
import AssignSubAccountBundle from "../AssignSubAccount/AssignSubAccountBundle";
import { useActivities } from "@/context/ActivitiesContext";
import { numericId, today } from "@/lib/today";

const items = [
  //   {
  //     label: "View Certificate",
  //     icon: TextIcon,
  //   },
  {
    label: "Gift",
    icon: GiftIcon,
  },
  {
    label: "Assign to Sub-account",
    icon: Users,
  },
];

export default function MoreContentPortfolioBundle({
  data,
}: {
  data: CartItemT;
}) {
  const router = useRouter();
  const [select, setSelect] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const params = useParams();
  const id = params.id as string; // {wine}
  const { portfolio, removeFromPortfolio } = usePortfolio();
  const { addToWineCellar } = useWineCellar();
  const { updatePortfolioItem } = usePortfolio();
  const { addToActivities } = useActivities();

  const handleGift = () => {
    setOpen(false);
    if (email === "") {
      toast.warning("Please provide an email.");
      return;
    }
    const activity_payload: ActivitiesT = {
      id: `activity-gift-bundle-${uuidv4()}`,
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
        purchase_price: data.purchase_price ?? 0,
        bottle_size: data.bottle_size,
      },
    };
    addToActivities(activity_payload);
    updatePortfolioItem(data.id, {
      status: "Gift Request", // or whatever your gifted status value is
    });

    toast.success(
      "Your wine has been gifted successfully. Awaiting confirmation from the recipient.",
    );
  };

  const handleCancelGift = () => {
    setOpen(false);
    updatePortfolioItem(data.id, {
      status: "In Bond", // or whatever your gifted status value is
    });
    toast.success("Your gifted wine has been successfully cancelled.");
  };

  const handleAssignToWineCellar = () => {
    addToWineCellar({
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
      location: "cellar",
      bottle_size: data.bottle_size,
      vintage: data.vintage,
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
    removeFromPortfolio(data.id);
    toast.success("Wine has been successfully moved to Wine Cellar.");
    router.push("/vintage/cellar");
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
              disabled={
                data.status !== "In Bond" &&
                item.label !== "Assign to Sub-account"
              }
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
            <Label className="text-white">Assign to Wine Cellar</Label>
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
