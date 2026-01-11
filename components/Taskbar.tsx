"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Bell, Bot, ShoppingCart } from "lucide-react";
import RightMenu from "./RightMenu";
import { useRouter } from "next/navigation";
import { SubAccountType } from "@/lib/types";
import { useSubAccount } from "@/context/SubAccountContext";

export default function Taskbar() {
  const router = useRouter();
  const { subAccounts } = useSubAccount();

  const activeAccount = subAccounts.find((item) => item.is_active === true) as
    | SubAccountType
    | undefined;

  return (
    <Card className="w-full h-14 rounded-none p-2 border-0 border-b">
      <CardContent className="items-center justify-between h-full flex p-0 px-2">
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => router.push("/vintage/dashboard")}
        >
          <Image
            alt="logo"
            width={400}
            height={400}
            className="w-8 h-auto"
            src={"/logo.png"}
          ></Image>
          <Label className="text-[18px] text-primary-brown">
            {activeAccount?.last_name} {activeAccount?.first_name.split("")[0]}.
          </Label>
        </div>
        <RightMenu></RightMenu>
      </CardContent>
    </Card>
  );
}
