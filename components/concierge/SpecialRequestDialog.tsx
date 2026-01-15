"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { FileUploadFormField } from "../ui/FileUploadFormField";
import { Form, FormField } from "../ui/form";
import { FileUpload } from "../FileUpload";
import { Input } from "../ui/input";
import { SimpleDropdownInput } from "../ui/simple-dropdown-input";
import { DropdownMenuField } from "../DropdownMenuField";
import { Value } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormField } from "../ui/InputFormField";
import { DropdownFormField } from "../ui/DropdownFormField";
import { LevelButtonGroupFormField } from "../LevelButtonGroupFormField";
import { Textarea } from "../ui/textarea";
import {
  ChevronLast,
  ChevronLeft,
  CircleCheck,
  House,
  PartyPopper,
  Warehouse,
} from "lucide-react";
import { CalendarFormField } from "../ui/CalendarFormField";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  wine_upload: z
    .any()
    .refine((file) => file instanceof File, { message: "Please upload a file" })
    .refine((file: File) => file.size <= 5_000_000, {
      message: "File size must be ≤ 5MB",
    }),
  wine_name: z.string().min(2, { message: "This field is required." }),
  vintage: z.string().min(2, { message: "This field is required." }),
  quantity: z.string().min(1, { message: "This field is required." }),
  bottle_size: z.string().min(2, { message: "This field is required." }),
  occasion: z.string().min(2, { message: "This field is required." }),
  priority: z.string().min(2, { message: "This field is required." }),
  notes: z.string().min(2, { message: "This field is required." }),
  delivery_option: z.string().min(2, { message: "This field is required." }),
  preferred_delivery_date: z
    .date()
    .refine((date) => !!date, { message: "Please select your preferred date" }),
});

const bottle_option = [
  {
    label: "Single",
    value: "Single",
  },
  {
    label: "Cases (6 bottles)",
    value: "Cases (6 bottles)",
  },
  {
    label: "Cases (12)",
    value: "Cases (12)",
  },
  {
    label: "Magnums",
    value: "Magnums",
  },
  {
    label: "Double Magnums",
    value: "Double Magnums",
  },
];

const occasion_option = [
  {
    label: "Wedding",
    value: "Wedding",
  },
  {
    label: "Yatch Party",
    value: "Yatch Party",
  },
  {
    label: "Private Gifting",
    value: "Private Gifting",
  },
  {
    label: "Special Celebration",
    value: "Special Celebration",
  },
  {
    label: "Personal Celebration",
    value: "Personal Celebration",
  },
  {
    label: "Corporate Event",
    value: "Corporate Event",
  },
  {
    label: "Anniversary",
    value: "Anniversary",
  },
];

const level = ["Standard", "Urgent"];

type FormValues = z.infer<typeof formSchema>;

const deliveryOpions = [
  {
    title: "Shop to my Home",
    desc: "Standard secure delivery",
    icon: House,
  },
  {
    title: "Deliver to Event",
    desc: "Times delivery foy your occasion",
    icon: PartyPopper,
  },
  {
    title: "Add to Cellared Collection",
    desc: "Store in our bonded warehouse",
    icon: Warehouse,
  },
];

interface PayloadT {
  wine_upload: undefined | File;
  wine_name: string;
  vintage: string;
  quantity: string;
  bottle_size: string;
  occasion: string;
  priority: string;
  notes: string;
  delivery_option: string;
  preferred_delivery_date: undefined | Date;
}

export default function SpecialRequestDialog({
  onClick,
}: {
  onClick: () => void;
}) {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [payload, setPayload] = useState<PayloadT>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wine_upload: undefined,
      wine_name: "",
      vintage: "",
      quantity: "",
      bottle_size: "",
      occasion: "",
      priority: "",
      notes: "",
      delivery_option: "",
      preferred_delivery_date: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("SUBMITTED:", data);
    setInitialState(false);
    setPayload({
      wine_upload: data.wine_upload,
      wine_name: data.wine_name,
      vintage: data.vintage,
      quantity: data.quantity,
      bottle_size: data.bottle_size,
      occasion: data.occasion,
      priority: data.priority,
      notes: data.notes,
      delivery_option: data.delivery_option,
      preferred_delivery_date: data.preferred_delivery_date,
    });
  };

  useEffect(() => {
    console.log("PAYLOAD: ", payload);
  });

  return (
    <>
      {initialState ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <Label variant="h1">Wine Information</Label>
              <div className="flex flex-col gap-2">
                <FileUploadFormField
                  control={form.control}
                  name="wine_upload"
                  label="Wine References"
                ></FileUploadFormField>
                <Label className="italic font-thin">
                  Upload label images or reference photos for exact match
                </Label>
              </div>
              <InputFormField
                control={form.control}
                name="wine_name"
                label="Wine Name *"
              ></InputFormField>
              <InputFormField
                control={form.control}
                name="vintage"
                label="Wine Vintage *"
              ></InputFormField>
              <div className="flex gap-2">
                <div>
                  <InputFormField
                    control={form.control}
                    name="quantity"
                    label="Quantity *"
                    type="number"
                  ></InputFormField>
                </div>
                <DropdownFormField
                  control={form.control}
                  name="bottle_size"
                  label="Bottle Size *"
                  options={bottle_option}
                ></DropdownFormField>
              </div>
              <Label variant="h1">Additional Preferences</Label>
              <DropdownFormField
                control={form.control}
                name="occasion"
                label="Occasion / Purpose *"
                options={occasion_option}
              ></DropdownFormField>
              <div className="flex flex-col gap-2">
                <LevelButtonGroupFormField
                  control={form.control}
                  label="Priority Level *"
                  name="priority"
                  options={level}
                ></LevelButtonGroupFormField>
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Special Requests / Notes *"
                    placeholder="Is there anything else we need to know? When do you need it by?"
                  />
                )}
              />
              <Label variant="h1">Delivery Preferences</Label>
              <div className="flex flex-col gap-2">
                <Label>Delivery Option *</Label>
                <FormField
                  control={form.control}
                  name="delivery_option"
                  render={({ field }) => (
                    <div className="flex flex-col gap-4">
                      {deliveryOpions.map((item) => (
                        <div
                          key={item.title}
                          onClick={() => {
                            setSelectedPreferences(item.title);
                            field.onChange(item.title); // ✅ THIS WAS MISSING
                          }}
                          className={`w-full transition flex h-20 cursor-pointer ${
                            field.value === item.title
                              ? "bg-primary-brown hover:bg-primary-brown/70 text-black"
                              : "hover:bg-primary-gray-500/50"
                          } border border-primary-brown rounded-2xl`}
                        >
                          <div className="w-20 h-full flex items-center justify-center">
                            <item.icon size={40} />
                          </div>
                          <div className="flex flex-col justify-center">
                            <Label
                              className={`font-semibold ${
                                selectedPreferences === item.title
                                  ? "text-black"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </Label>
                            <Label
                              className={`font-thin ${
                                selectedPreferences === item.title
                                  ? "text-black"
                                  : ""
                              }`}
                            >
                              {item.desc}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              <CalendarFormField
                control={form.control}
                name="preferred_delivery_date"
                label="Preferred Delivery Date"
              ></CalendarFormField>
            </div>
            <Button className="mt-4" id="submit">
              Submit to Concierge
            </Button>
          </form>
        </Form>
      ) : (
        <div className="">
          <Button
            variant={"ghost"}
            onClick={() => setInitialState(true)}
            className="w-1"
          >
            <ChevronLeft></ChevronLeft> Back
          </Button>
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <CircleCheck size={50} className="text-green-500"></CircleCheck>
            <Label variant="h1">Request Received</Label>
            <Label className="text-center">
              Your request has been received. Your personal concierge will
              confirm availability and follow up shortly.
            </Label>
            <Card className="w-full bg-primary-gray-500/70">
              <CardContent className=" flex flex-col gap-4 bg-transparent">
                <Label className="font-semibold text-primary-brown text-[18px]">
                  Request Summary
                </Label>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label>Wine</Label>
                    <Label className="font-semibold text-white">
                      {payload?.wine_name}
                    </Label>
                  </div>
                  <div className="flex justify-between">
                    <Label>Vintage</Label>
                    <Label className="font-semibold text-white">
                      {payload?.vintage}
                    </Label>
                  </div>
                  <div className="flex justify-between">
                    <Label>Quantity</Label>
                    <Label className="font-semibold text-white">
                      {payload?.quantity}
                    </Label>
                  </div>
                  <div className="flex justify-between">
                    <Label>Delivery Option</Label>
                    <Label className="font-semibold text-white">
                      {payload?.delivery_option}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="w-full">
              <Button onClick={onClick} className="w-full">
                Back to Concierge
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
