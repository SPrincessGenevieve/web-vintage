import LandingHeader from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex landing-cont">
      <div className="relative video-cont w-full h-full bg-black flex items-center justify-center">
        <div className="absolute w-full h-full bg-primary-gray-400/30"></div>
        <video
          className="video-cont-2"
          src="/cellar.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      {/* <div className="scroll-area w-full flex items-center justify-center ">
        {children}
      </div> */}
      <div className="landing-form-cont p-4 max-w-[50vh] h-full pt-20 gap-4 flex flex-col items-center justify-center z-20 w-full">
       {children}
      </div>
    </div>
  );
}
// register-cont
