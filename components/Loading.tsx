import React from "react";
import { Spinner } from "./ui/spinner";
import { Label } from "./ui/label";

export default function Loading() {
  return (
    <div className="w-full h-full bg-primary-gray-500 rounded-2xl flex flex-col gap-2 items-center justify-center">
      <Spinner></Spinner>
      <Label>Loading...</Label>
    </div>
  );
}
