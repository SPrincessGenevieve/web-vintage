"use client";
import BottombarMobile from "@/components/BottmobarMobile";
import SidebarWeb from "@/components/SidebarWeb";
import SidebarSettings from "@/components/SidebaSettings";
import Taskbar from "@/components/Taskbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCartSummary } from "@/context/CartSummary";
import { useUserContext } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function VintageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { setUserDetails, alertDialog } = useUserContext();
  const { clearCartSummary } = useCartSummary();
  const [open, setOpen] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    if (pathname.includes("marketplace")) {
      setUserDetails({
        vintage_table_detail: false,
      });
    }
  }, [pathname]);

  useEffect(() => {
    setOpen(alertDialog);
  }, [alertDialog]);

  useEffect(() => {
    setUserDetails({
      alertDialog: open,
    });
  }, [open]);

  const pathSummarry = ["/vintage/cart/review", "/vintage/cart/success"];

  useEffect(() => {
    if (!pathSummarry.some((path) => pathname.includes(path))) {
      clearCartSummary();
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("settings")) {
      console.log("PATH IS SETTINGS");
      setIsSettings(true);
    } else {
      setIsSettings(false);
    }
  }, [pathname]);

  return (
    <div className="h-screen vintage-layout-main relative flex justify-between flex-col">
      <Dialog open={alertDialog} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Label>
                You can only have 5 payment methods. Please delete one before
                adding.
              </Label>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="bg-green-400">
        <Taskbar></Taskbar>
      </div>
      <div className="vintage-sub-count flex h-[94%] p-4 gap-4">
        <div className="web-cont-sidebar">
          {isSettings ? (
            <SidebarSettings></SidebarSettings>
          ) : (
            <SidebarWeb></SidebarWeb>
          )}
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
