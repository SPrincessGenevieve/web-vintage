import Image from "next/image";
import React from "react";
import { Label } from "../ui/label";

export default function RegisterHeader({ step }: { step: number }) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <Image
        width={400}
        height={400}
        alt="logo"
        className="w-25"
        src={"/logo.png"}
      />
      <Label variant="h2">Membership Application</Label>
      <Label variant="p" className="text-center text-[12px]">
        We don't have email on file. Please complete this Membership Application
        form.
      </Label>
      <Label variant="p" className="text-center text-[12px]">
        Step {step} of 3
      </Label>
    </div>
  );
}
