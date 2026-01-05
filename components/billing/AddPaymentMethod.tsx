import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";
import CreditCard from "../CreditCard";

export default function AddPaymentMethod() {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full flex flex-col gap-2 items-center transition ease-in-out bg-primary-gray-500/50 hover:bg-primary-gray-500/30 p-4 rounded-xl">
          <Plus className="text-white"></Plus>
          <Label>Add New Payment Method</Label>
          <Image
            src={"/card-logo.png"}
            alt=""
            width={500}
            height={500}
            className="w-auto h-8"
          ></Image>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <CreditCard></CreditCard>
      </DialogContent>
    </Dialog>
  );
}
