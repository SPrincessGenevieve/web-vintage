"use client";

import { Bell, Bot, ShoppingCart } from "lucide-react";
import React, { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { Label } from "./ui/label";
import { useCart } from "@/context/CartContext";

export default function RightMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/")[1];
  const { cart } = useCart();

  const [isPending, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

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

  const handleNavigate = (index: number, link: string) => {
    setActiveIndex(index);
    startTransition(() => {
      router.push(link);
    });
  };

  const handleSettings = () =>{
    router.push("/vintage/settings/profile")
  }


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
      <Avatar onClick={handleSettings} className="cursor-pointer">
        <AvatarImage className="object-cover" src={"/profile.jpg"} />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </div>
  );
}
