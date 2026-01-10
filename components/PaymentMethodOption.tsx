"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";
import CreditCard from "./CreditCard";
import { useUserContext } from "@/context/UserContext";

export default function PaymentMethodOption() {
  const {
    cart_total,
    current_investment,
    payment_method,
    balance,
    setUserDetails,
  } = useUserContext();
  const [selectedPayment, setSelectedPayment] = React.useState(
    payment_method.find((c) => c.is_default)?.last_code || "account-bal"
  );
  return (
    <Card className="w-full h-full  max-h-80 overflow-y-auto">
      <CardContent className="flex h-full flex-col gap-4 p-4">
        <CardHeader className="w-full flex flex-col items-center">
          <CardTitle>
            <Label variant="h2">Payment Method</Label>
          </CardTitle>
        </CardHeader>

        <RadioGroup
          value={selectedPayment}
          onValueChange={(value) => {
            setSelectedPayment(value);

            setUserDetails((prev) => ({
              payment_method: prev.payment_method.map((c) => ({
                ...c,
                is_default: c.last_code === value,
              })),
            }));
          }}
          className="flex flex-col gap-4 "
        >
          {payment_method.map((item, index) => (
            <div
              key={index}
              className={`relative transition ease-in-out border rounded-2xl p-2 py-4 flex w-full items-center gap-3 ${
                item.is_default ? "border-primary-brown" : "border-transparent"
              }`}
            >
              <RadioGroupItem value={item.last_code} id={`card-${index}`} />
              <Label htmlFor={`card-${index}`} className="w-full">
                <div className="flex gap-2 justify-between w-full items-center">
                  <Image
                    src={item.img}
                    width={500}
                    height={500}
                    alt="card"
                    className="w-20 rounded-md h-auto"
                  />
                  <div>
                    <Label
                      htmlFor={`card-${index}`}
                      variant="h2"
                      className="text-white"
                    >
                      **** - **** - {item.last_code}
                    </Label>
                    <Label htmlFor={`card-${index}`}>Exp: {item.exp}</Label>
                  </div>
                  <div className="w-16">
                    {item.is_default && (
                      <Label className="text-blue-500">Default</Label>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Dialog>
          <DialogTrigger className="w-full pb-2">
            <div className="w-full flex flex-col gap-2 items-center bg-primary-gray-500/50 hover:bg-primary-gray-500/30 p-4 rounded-xl">
              <Plus className="text-white" />
              <Label>Add New Payment Method</Label>
              <Image
                src="/card-logo.png"
                alt=""
                width={500}
                height={500}
                className="w-auto h-8"
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <CreditCard />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
