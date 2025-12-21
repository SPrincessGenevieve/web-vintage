"use client";
import BottombarMobile from "@/components/BottmobarMobile";
import SidebarWeb from "@/components/SidebarWeb";
import Taskbar from "@/components/Taskbar";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function VintageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { setUserDetails } = useUserContext();

  useEffect(() => {
    if (pathname.includes("marketplace")) {
      setUserDetails({
        vintage_table_detail: false,
      });
    }
  }, [pathname]);

  return (
    <div className="h-screen vintage-layout-main relative flex justify-between flex-col">
      <div className="bg-green-400">
        <Taskbar></Taskbar>
      </div>
      <div className="vintage-sub-count flex h-[94%] p-4 gap-4">
        <div className="web-cont-sidebar">
          <SidebarWeb></SidebarWeb>
        </div>
        <div className="w-full h-full overflow-y-auto vintage-children">
          {children}
        </div>
      </div>
      <div className="mobile-cont-bottombar hidden fixed bottom-0 w-full">
        <BottombarMobile></BottombarMobile>
      </div>
    </div>
  );
}
