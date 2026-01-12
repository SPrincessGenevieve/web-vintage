"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CartItemT, SubAccountType } from "@/lib/types";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDelivery } from "@/context/DeliveryContext";
import { useSubAccount } from "@/context/SubAccountContext";
import { default_profile } from "@/lib/default_profile";
import { Form } from "../ui/form";
import { InputFormField } from "../ui/InputFormField";
import { SimpleDropdownInput } from "../ui/simple-dropdown-input";
import { CalendarFormField } from "../ui/CalendarFormField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  first_name: z.string().min(2, { message: "This field is required." }),
  last_name: z.string().min(2, { message: "This field is required." }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(2, { message: "This field is required." }),
  address_1: z.string().min(2, { message: "This field is required." }),
  address_2: z.string().min(2, { message: "This field is required." }),
  town_county: z.string().min(2, { message: "This field is required." }),
  postal_code: z.string().min(2, { message: "This field is required." }),
  country: z.string().min(2, { message: "This field is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const base64ToFile = (
  base64?: string,
  filename = "image.png"
): File | undefined => {
  if (!base64) return undefined;

  // If it's already a File URL or normal URL, don't convert
  if (!base64.startsWith("data:")) return undefined;

  const parts = base64.split(",");
  if (parts.length !== 2) return undefined;

  const mimeMatch = parts[0].match(/data:(.*?);base64/);
  if (!mimeMatch) return undefined;

  const mime = mimeMatch[1];
  const binary = atob(parts[1]);

  const u8arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    u8arr[i] = binary.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
};

export default function DeliverDialog({ item }: { item: CartItemT }) {
  const { addToDelivery } = useDelivery();
  const [initialStep, setInitialStep] = useState(true);
  const [loading, setLoading] = useState(false);
  const { subAccounts } = useSubAccount();
  const rawID = uuidv4();
  const delivery_id = `delivery-${rawID}`;
  const user_id = `user-${rawID}`;
  const activeAccount = subAccounts.find((item) => item.is_active === true) as
    | SubAccountType
    | undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: activeAccount?.first_name || "",
      last_name: activeAccount?.last_name || "",
      email: default_profile.email || "",
      phone: default_profile.phone || "",
      postal_code: default_profile.postal_code || "",
      country: default_profile.country || "",
      address_1: "",
      address_2: "",
    },
  });

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      setInitialStep(false);

      addToDelivery({
        id: delivery_id,
        detail: {
          id: user_id,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          birth_date: default_profile.birth_date,
          street_address: default_profile.street_address,
          city: default_profile.city,
          state: default_profile.state,
          postal_code: values.postal_code,
          country: values.country,
          investment_time: default_profile.investment_time,
          budget: default_profile.budget,
          region: default_profile.region,
          town_county: default_profile.town_county,
          profile_picture: default_profile.profile_picture,
          membership_status: default_profile.membership_status,
        },
        wine: item,
        address_1: values.address_1,
        address_2: values.address_2,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full">Deliver</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>
            {initialStep ? "Address Details" : "Delivery Summary"}
          </DialogTitle>
        </DialogHeader>
        <div>
          {initialStep ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 "
              >
                <Input label="Quantity" disabled value={item.quantity}></Input>
                <div className="flex flex-col gap-4">
                  <InputFormField
                    control={form.control}
                    name="first_name"
                    label="First Name"
                  />
                  <InputFormField
                    control={form.control}
                    name="last_name"
                    label="Last Name"
                  />
                  <InputFormField
                    control={form.control}
                    name="phone"
                    label="Tel/Phone No."
                  />
                  <InputFormField
                    control={form.control}
                    name="email"
                    label="Email"
                  />
                  <InputFormField
                    control={form.control}
                    name="address_1"
                    label="Address 1"
                  />
                  <InputFormField
                    control={form.control}
                    name="address_2"
                    label="Address 2"
                  />
                  <InputFormField
                    control={form.control}
                    name="town_county"
                    label="Town/County"
                  />
                  <InputFormField
                    control={form.control}
                    name="country"
                    label="Country"
                  />
                  <InputFormField
                    control={form.control}
                    name="postal_code"
                    label="Postal Code"
                  />
                </div>
                <Button type={"submit"}>
                  {loading ? <Spinner></Spinner> : "Deliver"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="w-full">
              <Card className="bg-primary-gray-500/70">
                <CardContent className="bg-transparent flex items-center justify-center">
                  <Image
                    alt=""
                    width={400}
                    height={400}
                    className="w-40 h-50 object-contain"
                    src={
                      item.basket === null ? item.images[0] : item.basket.image
                    }
                  ></Image>
                </CardContent>
              </Card>
              <div>
                <Label variant="h2" className="text-white">
                  {item.wine_name}
                </Label>
                <div className="flex flex-col gap-2">
                  <div className="w-full flex items-center justify-between">
                    <Label>Vintage:</Label>
                    <Label>{item.vintage}</Label>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <Label>Cases:</Label>
                    <Label>{item.quantity}</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
