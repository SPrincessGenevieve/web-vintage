"use client";

import {
  Bell,
  Bot,
  ChartSpline,
  LockIcon,
  ReceiptPoundSterling,
  SettingsIcon,
  Shield,
  ShieldAlert,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { Label } from "./ui/label";
import { useCart } from "@/context/CartContext";
import { useSubAccount } from "@/context/SubAccountContext";
import { SubAccountType } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import insightsIcon from "@/public/insightsIcon";
import storageIcon from "@/public/storageIcon";
import activitiesIcon from "@/public/activitiesIcon";

const settings_menu = [
  {
    label: "Profile",
    value: "profile",
    icon: SettingsIcon,
    link: "/vintage/settings/profile",
  },
  {
    label: "Password",
    value: "password",
    icon: LockIcon,
    link: "/vintage/settings/password",
  },
  {
    label: "Security",
    value: "security",
    icon: Shield,
    link: "/vintage/settings/security",
  },
  {
    label: "Billing",
    value: "billing",
    icon: ReceiptPoundSterling,
    link: "/vintage/settings/billing",
  },
  {
    label: "Insights",
    value: "insights",
    icon: insightsIcon,
    link: "/vintage/insights",
  },
  {
    label: "Indicies",
    value: "indicies",
    icon: ChartSpline,
    link: "/vintage/indicies",
  },
  {
    label: "Storage",
    value: "storage",
    icon: storageIcon,
    link: "/vintage/storage",
  },
  {
    label: "Activities",
    value: "activities",
    icon: activitiesIcon,
    link: "/vintage/activities",
  },
  {
    label: "Risk Warning",
    value: "risk",
    icon: ShieldAlert,
    link: "/vintage/settings/risk",
  },
];

export default function RightMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/")[1];
  const { cart } = useCart();
  const { subAccounts } = useSubAccount();
  const activeAccount = subAccounts.find((item) => item.is_active === true) as
    | SubAccountType
    | undefined;

  const [isPending, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [activeSettingsPage, setActiveSettingsPage] = useState("");
  const [openSheet, setOpenSheet] = useState(false);
  const data = [
    {
      label: "ai-support",
      icon: Bot,
      link: "/vintage/ai-support",
      count: 0,
    },
    {
      label: "notification",
      icon: Bell,
      link: "/vintage/notification",
      count: 0,
    },
    {
      label: "cart",
      icon: ShoppingCart,
      link: "/vintage/cart",
      count: cart.length,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const p = path.split("settings/");
    // setActiveSettingsPage(p[0]);
    console.log("LINK: ", p);
  }, [pathname]);

  const handleNavigate = (index: number, link: string) => {
    setActiveIndex(index);
    startTransition(() => {
      router.push(link);
    });
  };

  const handleSettings = () => {
    router.push("/vintage/settings/profile");
  };

  const handleNavigateSettings = (label: string, link: string) => {
    setActiveSettingsPage(label);
    router.push(link);
    setTimeout(() => {
      setOpenSheet(false);
    }, 500);
  };

  return (
    <div className="flex gap-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {isPending && activeIndex === index ? (
            <Spinner />
          ) : (
            <div className="relative">
              <div
                className={`${
                  item.count === 0 && "hidden"
                } absolute bg-red-600/80 rounded-full -top-1 -right-1 w-4 h-4 flex items-center justify-center`}
              >
                <Label className="font-bold text-[10px]">{item.count}</Label>
              </div>
              <item.icon
                onClick={() => handleNavigate(index, item.link)}
                className={`${
                  path === item.label ? "text-primary-brown" : "text-white/70"
                } hover:text-primary-brown transition cursor-pointer`}
              />
            </div>
          )}
        </div>
      ))}
      {width && width <= 795 ? (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="object-cover"
                src={activeAccount?.image ?? ""}
              />
              <AvatarFallback>
                {activeAccount?.last_name.split("")[0]}
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="gap-0 py-8">
            {settings_menu.map((item, i) => (
              <Button
                key={i}
                variant={
                  pathname.startsWith(`/vintage/${item.value}`) ||
                  pathname.startsWith(`/vintage/settings/${item.value}`)
                    ? "default"
                    : "ghost"
                }
                onClick={() => handleNavigateSettings(item.value, item.link)}
                className="rounded-none justify-start hover:bg-primary-brown/30"
              >
                <div className="flex gap-2 w-full items-center">
                  {item.value === "activities" ? (
                    <item.icon
                      fill={"transparent"}
                      color={
                        pathname.startsWith(`/vintage/${item.value}`) ||
                        pathname.startsWith(`/vintage/settings/${item.value}`)
                          ? "black"
                          : "white"
                      }
                    />
                  ) : (
                    <item.icon
                      color={
                        pathname.startsWith(`/vintage/${item.value}`) ||
                        pathname.startsWith(`/vintage/settings/${item.value}`)
                          ? "black"
                          : "white"
                      }
                    />
                  )}
                  <Label
                    className={`capitalize ${
                      pathname.startsWith(`/vintage/${item.value}`) ||
                      pathname.startsWith(`/vintage/settings/${item.value}`)
                        ? "text-black"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Label>
                </div>
              </Button>
            ))}
          </SheetContent>
        </Sheet>
      ) : (
        <Avatar onClick={handleSettings} className="cursor-pointer">
          <AvatarImage
            className="object-cover"
            src={activeAccount?.image ?? ""}
          />
          <AvatarFallback>
            {activeAccount?.last_name.split("")[0]}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
