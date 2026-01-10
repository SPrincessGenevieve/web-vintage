"use client";
import { Label } from "@/components/ui/label";
import { CartItemT } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { SubAccountType } from "@/lib/types";
import { useSubAccount } from "@/context/SubAccountContext";
import { default_sub_account } from "@/lib/default_sub_account";
import AddSubAccount from "../settings/sub-account/AddSubAccount";
import { Button } from "../ui/button";
import { usePortfolio } from "@/context/PortfolioContext";
import { toast } from "sonner";
import { useWineCellar } from "@/context/WineCellarContext";

export default function AssignSubAccount({ data }: { data: CartItemT }) {
  const { subAccounts, addSubAccount } = useSubAccount();
  const { updatePortfolioItem } = usePortfolio();
  const { updateWineCellarItem } = useWineCellar();

  const bottle_size =
    data.bottle_size === "0750"
      ? 75
      : data.bottle_size === "1500"
      ? 150
      : data.bottle_size === "3000"
      ? 300
      : data.bottle_size === "6000"
      ? 600
      : 0;

  const total =
    Number(data.stock_wine_vintage?.market_value) *
    data.case_size *
    data.quantity;

  useEffect(() => {
    if (subAccounts.length === 0) {
      default_sub_account.forEach((item) => addSubAccount(item));
    }
  }, [subAccounts.length]);

  const [activeSubAccount, setActiveSubAccount] = useState<SubAccountType>(
    data.sub_account
  );

  console.log("ACTIVE SUB ACCOUNT : ", subAccounts);

  const handleReassign = () => {
    if (data.location === "portfolio") {
      updatePortfolioItem(data.id, {
        sub_account: activeSubAccount,
      });
    } else {
      updateWineCellarItem(data.id, {
        sub_account: activeSubAccount,
      });
    }
    toast.success(
      `Wine successfully assigned to account ${activeSubAccount.first_name} ${activeSubAccount.last_name}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Label variant="h1">Allocate to which sub-account?</Label>
      <Card className="bg-primary-gray-500/50">
        <CardContent className="bg-transparent flex flex-col items-center justify-center">
          <div className="flex flex-col w-full">
            <div className="flex w-full p-4 items-center justify-center">
              <Image
                src={data.images[0]}
                alt=""
                width={400}
                height={400}
                className="h-40 w-auto"
              ></Image>
            </div>
            <div>
              <Label variant="h2" className="font-thin">
                {data.case_size}x{bottle_size}cl
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <Label variant="h2" className="text-primary-brown">
        {data.wine_name}
      </Label>
      <div className="flex w-full justify-between">
        <div className="py-2 w-full flex flex-col justify-start">
          <div>
            <Label className="font-thin">Price</Label>
          </div>
          <div>
            <Label variant="h2" className="text-green-500">
              £ {Number(total.toFixed(2)).toLocaleString()}
            </Label>
          </div>
        </div>
        <div className="py-2 w-full flex flex-col items-end">
          <div>
            <Label className="font-thin">Investment</Label>
          </div>
          <div>
            <Label variant="h2" className="text-green-500">
              £ {Number(total.toFixed(2)).toLocaleString()}
            </Label>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Input
            label="Sub-account"
            placeholder="Select sub-account"
            value={`${activeSubAccount?.last_name ?? ""} ${
              activeSubAccount?.first_name ?? ""
            }`}
          ></Input>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {subAccounts.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => setActiveSubAccount(item)}
            >
              {item.last_name} {item.first_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex justify-end w-full">
        <Button onClick={handleReassign}>Re-assign</Button>
      </div>
    </div>
  );
}
