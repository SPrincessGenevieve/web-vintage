"use client";
import CartProgress from "@/components/cart/CartProgress";
import { WineImage } from "@/components/marketplace/WineImage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCartSummary } from "@/context/CartSummary";
import { usePortfolio } from "@/context/PortfolioContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function WineSuccess() {
  const router = useRouter();
  const { clearCartSummary, cart_summary } = useCartSummary();

  useEffect(() => {
    if (cart_summary.length === 0) {
      router.replace("/vintage/cart");
    }
  }, [cart_summary]);

  const handleNext = (btn: string) => {
    try {
      if (btn === "portfolio") {
        router.replace("/vintage/portfolio");
      } else {
        router.replace("/vintage/marketplace");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full ">
      <div className="fixed  flex top-0 -z-10 w-full h-full">
        <div className="relative h-full flex justify-center">
          <div className="flex overflow-hidden relative items-center justify-center w-70 bg-[#1a0001] h-100 rounded-b-full bg-radial  bg-linear-to-b from-primary-gray-500/30 from-20% via-[#1a0001] to-[#410000]">
            <Image
              alt=""
              src={"/wine-wave.png"}
              width={400}
              height={400}
              className="w-full h-45 bottom-0 absolute z-30 object-cover object-right"
            ></Image>
          </div>
          <div className="bg-[#410000]  top-100 w-5 h-150 absolute"></div>
          <div className="bg-[#410000] bottom-10 -left-10 h-5 w-screen absolute"></div>
        </div>
      </div>
      <div className="w-full z-20 flex items-center justify-center p-2">
        <CartProgress step={3}></CartProgress>
      </div>
      <div className="w-full h-full flex justify-end">
        <div className="w-[80%] flex flex-col gap-8">
          <div>
            <Label
              variant="h1"
              className="font-fleur font-extralight text-[40px]"
            >
              Thank you for your purchase!{" "}
            </Label>
            <Label>Your order has been successfully processed.</Label>
          </div>
          <div className="w-full mt-8 flex overflow-x-auto gap-4 scroll-area">
            {cart_summary.map((item, index) => {
              const imageSrc =
                item.basket?.image ??
                item.images?.[0] ??
                item.wine_parent?.images?.[0] ??
                "/default-image.png"; // fallback if all are undefined

              return (
                <div
                  key={index}
                  className="relative shrink-0 w-55 flex flex-col items-center juc gap-4"
                >
                  <div className="absolute right-0 min-w-6 min-h-6 bg-primary-brown rounded-full flex justify-center">
                    <Label className="text-black text-[12px] font-bold">
                      +{item.quantity}
                    </Label>
                  </div>
                  <div className="h-40 w-full flex items-center justify-center">
                    <Image
                      src={imageSrc}
                      alt={item.wine_name}
                      width={400}
                      height={400}
                      className="w-auto h-full  rounded-2xl"
                    />
                  </div>
                  <Label className="text-center">{item.wine_name}</Label>
                </div>
              );
            })}
          </div>
          <div className="w-full flex gap-2 items-center mt-8">
            <Button onClick={() => handleNext("portfolio")}>
              View Portolio
            </Button>
            <Button onClick={() => handleNext("market")} variant={"outline"}>
              Make Another Investment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
