"use client";

import { Bell, Bot, ShoppingCart } from "lucide-react";
import React, { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "./ui/spinner";

export default function RightMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/")[1];

  const [isPending, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const data = [
    { label: "ai-support", icon: Bot, link: "/vintage/ai-support" },
    { label: "notification", icon: Bell, link: "/vintage/notification" },
    { label: "cart", icon: ShoppingCart, link: "/vintage/cart" },
  ];

  const handleNavigate = (index: number, link: string) => {
    setActiveIndex(index);
    startTransition(() => {
      router.push(link);
    });
  };

  return (
    <div className="flex gap-4">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {isPending && activeIndex === index ? (
            <Spinner />
          ) : (
            <item.icon
              onClick={() => handleNavigate(index, item.link)}
              className={`${
                path === item.label ? "text-primary-brown" : "text-white/70"
              } hover:text-primary-brown transition cursor-pointer`}
            />
          )}
        </div>
      ))}
      <Avatar className="">
        <AvatarImage />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
    </div>
  );
}
