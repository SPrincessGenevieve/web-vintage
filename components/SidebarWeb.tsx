"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { menu_list } from "@/lib/selection";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { usePathname } from "next/navigation";

export default function SidebarWeb() {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/vintage/")[1]

  const handleTabs = (label: string, link: string) => {
    setActiveTab(label);
    router.push(link);
  };

  const handleLogout = () => {
    setLoading(true);
    router.push("/");
  };

  useEffect(() =>{
    if(activeTab === ""){
      setActiveTab(path)
    }
  }, [path])

  return (
    <Card className="w-full max-w-65 h-full p-4">
      <CardContent className="p-0 flex flex-col h-full justify-between">
        <div className="flex flex-col w-full">
          {menu_list.map((item, index) => (
            <Button
              variant={item.value === activeTab ? "default" : "ghost"}
              onClick={() => handleTabs(item.value, item.link)}
              className="justify-start hover:bg-primary-brown/30"
            >
              <item.icon
                color={item.value === activeTab ? "black" : "white"}
              ></item.icon>
              {item.label}
            </Button>
          ))}
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
      </CardContent>
    </Card>
  );
}
