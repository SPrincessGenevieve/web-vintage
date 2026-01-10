"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { menu_list, settings_menu_list } from "@/lib/selection";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  LogOut,
  NotebookText,
  PanelBottomDashed,
  Plus,
  User,
} from "lucide-react";
import { Spinner } from "./ui/spinner";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useSubAccount } from "@/context/SubAccountContext";
import { default_sub_account } from "@/lib/default_sub_account";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AddSubAccount from "./settings/sub-account/AddSubAccount";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import UpdateSubAccount from "./settings/sub-account/UpdateSubAccount";

export default function SidebarSettings() {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/settings/")[1];
  const { clearCart } = useCart();
  const { subAccounts, addSubAccount, clearSubAccounts } = useSubAccount();

  const handleTabs = (label: string, link: string) => {
    setActiveTab(label);
    router.push(link);
  };

  const handleLogout = () => {
    setLoading(true);
    clearCart();
    router.push("/");
  };

  useEffect(() => {
    setActiveTab(path);
  }, [path]);

  useEffect(() => {
    if (subAccounts.length === 0) {
      default_sub_account.forEach((item) => addSubAccount(item));
    }
  }, [subAccounts.length]);

  console.log("SUB ACCOUNTS: ", subAccounts);

  const deleteITems = () => {
    clearSubAccounts();
  };

  return (
    <Card className="w-50 h-full p-4">
      <CardContent className="p-0 flex w-full flex-col h-full justify-between">
        <div className="flex flex-col w-full gap-4">
          <div
            onClick={() => router.push("/vintage/dashboard")}
            className="flex gap-2 cursor-pointer"
          >
            <ChevronLeft
              size={18}
              className="text-white cursor-pointer"
            ></ChevronLeft>
            <Label className="cursor-pointer">Back</Label>
          </div>
          <div className="flex flex-col w-full">
            {settings_menu_list.map((item, index) => (
              <Button
                key={index}
                variant={item.value === activeTab ? "default" : "ghost"}
                onClick={() => handleTabs(item.value, item.link)}
                className="font-medium justify-start hover:bg-primary-brown/30"
              >
                <item.icon
                  color={item.value === activeTab ? "black" : "white"}
                ></item.icon>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="p-0 m-0">
                <AccordionTrigger className="p-0 py-2 m-0">
                  <div className="flex gap-2">
                    <User size={18} className="text-primary-brown"></User>
                    <Label className="text-white">Sub Accounts</Label>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    {subAccounts.map((item, index) => (
                      <UpdateSubAccount
                        item={item}
                        index={index}
                      ></UpdateSubAccount>
                    ))}
                    <AddSubAccount></AddSubAccount>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-2 w-full py-2 cursor-pointer">
            <NotebookText
              size={18}
              className="text-primary-brown cursor-pointer"
            ></NotebookText>
            <Label className="text-white cursor-pointer">
              Terms and Conditions
            </Label>
          </div>
          <div className="flex gap-2 w-full py-2 cursor-pointer">
            <PanelBottomDashed
              size={18}
              className="text-primary-brown cursor-pointer"
            ></PanelBottomDashed>
            <Label className="text-white cursor-pointer">Welcome Guide</Label>
          </div>
          <Button variant={"ghost"} onClick={handleLogout}>
            {loading ? (
              <>
                <Spinner></Spinner>
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="text-primary-red-200"></LogOut>
                Logout
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
