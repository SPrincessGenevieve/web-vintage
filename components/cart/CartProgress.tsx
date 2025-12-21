import React from "react";
import { Label } from "../ui/label";

export default function CartProgress({ step }: { step: number }) {
  return (
    <div className="w-[80%] flex items-center justify-evenly gap-2">
      {Array.from({ length: 3 }).map((item, index) => (
        <>
          <div className="w-[10%] flex items-center justify-center">
            <Label
              className={`${
                step === index + 1
                  ? "bg-primary-brown text-black"
                  : step > index + 1
                  ? "bg-primary-brown text-black"
                  : step > index + 1
                  ? "bg-primary-brown text-black"
                  : "bg-transparent text-primary-brown"
              } w-7 h-7 border border-primary-brown font-bold rounded-full flex items-center justify-center text-center`}
            >
              {index + 1}
            </Label>
          </div>
          {index !== 2 && (
            <div className="flex gap-2 w-full rounded-full h-1 bg-primary-brown"></div>
          )}
        </>
      ))}
    </div>
  );
}
