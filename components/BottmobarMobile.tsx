"use client";

import { menu_list_mobile } from "@/lib/selection";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Label } from "./ui/label";

export default function BottombarMobile() {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/")[1];

  const handleTabs = (label: string, link: string) => {
    setActiveTab(label);
    router.push(link);
  };

  const handleLogout = () => {
    setLoading(true);
    router.push("/");
  };

  useEffect(() => {
    setActiveTab(path);
  }, [path]);

  return (
    <div className="w-full h-[54px] bg-primary-gray-400">
      <div className="flex w-full">
        {menu_list_mobile.map((item, index) => (
          <Button
            key={index}
            variant={"ghost"}
            onClick={() => handleTabs(item.value, item.link)}
            className="flex flex-col w-[20%] h-full justify-start hover:bg-primary-brown/30"
          >
            {item.value === "activities" ? (
              <item.icon
                fill={"transparent"}
                color={item.value === activeTab ? "#9C513E" : "white"}
              ></item.icon>
            ) : (
              <item.icon
                color={item.value === activeTab ? "#9C513E" : "white"}
              ></item.icon>
            )}
            <Label className={`text-[10px] ${item.value === activeTab ? "text-[#c5674f]" : "text-white"}`}>{item.label}</Label>
          </Button>
        ))}
      </div>
    </div>
  );
}
