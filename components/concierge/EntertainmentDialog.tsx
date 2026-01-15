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
  Blend,
  Cake,
  ChevronLast,
  ChevronLeft,
  CircleCheck,
  Gem,
  Gift,
  Grip,
  Handshake,
  House,
  PartyPopper,
  Sailboat,
  Vegan,
  Warehouse,
} from "lucide-react";
import { CalendarFormField } from "../ui/CalendarFormField";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  occasion: z.string().min(2, { message: "This field is required." }),
  event_date: z.date().nullable().optional(),
  event_location: z.string().min(2, { message: "This field is required." }),
  guest_count: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "",
    }),
  wine_name: z.string().min(2, { message: "This field is required." }),
  note: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "This field is required.",
    }),
  reference: z
    .any()
    .optional()
    .refine((file) => file instanceof File, { message: "" })
    .refine((file: File) => file.size <= 5_000_000, {
      message: "File size must be ≤ 5MB",
    }),
  budget: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "",
    }),
  selection: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "",
    }),
  delivery_option: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== "", {
      message: "",
    }),
  preferred_delivery_date: z
    .date()
    .refine((date) => !!date, { message: "Please select your preferred date" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PayloadT {
  occasion: string;
  event_date: undefined | Date;
  event_location: string;
  guest_count: string;
  wine_name: string;
  note: string;
  reference: string | File;
  budget: string;
  selection: string;
  delivery_option: string;
  preferred_delivery_date: undefined | Date;
}

const occasion_option = [
  {
    label: "Wedding",
    value: "Wedding",
    icon: Blend,
  },
  {
    label: "Yatch Party",
    value: "Yatch Party",
    icon: Sailboat,
  },
  {
    label: "Private Gifting",
    value: "Private Gifting",
    icon: Gift,
  },
  {
    label: "Special Celebration",
    value: "Special Celebration",
    icon: Cake,
  },
  {
    label: "Personal Celebration",
    value: "Personal Celebration",
    icon: PartyPopper,
  },
  {
    label: "Corporate Event",
    value: "Corporate Event",
    icon: Handshake,
  },
  {
    label: "Anniversary",
    value: "Anniversary",
    icon: Vegan,
  },
  {
    label: "Others",
    value: "Others",
    icon: Grip,
  },
];

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

const selection = ["Rare Vintages", "Luxury", "Table Wines"];

export default function EntertainmentDialog({
  onClick,
}: {
  onClick: () => void;
}) {
  const [option, setOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [initialState, setInitialState] = useState(true);
  const [payload, setPayload] = useState<PayloadT>();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occasion: "",
      event_date: undefined,
      event_location: "",
      guest_count: "",
      wine_name: "",
      note: "",
      reference: "",
      budget: "",
      selection: "",
      delivery_option: "",
      preferred_delivery_date: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("SUBMITTED:", data);
    setInitialState(false);
    setPayload({
      occasion: data.occasion,
      event_date: data.event_date ?? undefined,
      event_location: data.event_location,
      guest_count: data.guest_count ?? "",
      wine_name: data.wine_name,
      note: data.note ?? "",
      reference: data.reference,
      budget: data.budget ?? "",
      selection: data.selection ?? "",
      delivery_option: data.delivery_option ?? "",
      preferred_delivery_date: data.preferred_delivery_date,
    });
  };

  return (
    <>
      {initialState ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Label variant="h1">Event Details</Label>

            <div className="flex flex-col gap-2">
              <Label>Type of Occasion</Label>
              <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <div className="grid grid-cols-2 items-center justify-center gap-4">
                    {occasion_option.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          setOption(item.label);
                          field.onChange(item.label); // ✅ THIS WAS MISSING
                        }}
                        className={`w-full transition items-center justify-center py-2 flex flex-col h-25 cursor-pointer ${
                          field.value === item.label
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
                              option === item.label ? "text-black" : ""
                            }`}
                          >
                            {item.label}
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
              name="event_date"
              label="Event Date"
            ></CalendarFormField>
            <div className="flex flex-col gap-2">
              <InputFormField
                control={form.control}
                name="event_location"
                label="Event Location"
              ></InputFormField>
              <Label className="italic">Leave blank if flexible</Label>
            </div>
            <div className="flex flex-col gap-2">
              <InputFormField
                control={form.control}
                name="guest_count"
                label="Number of Guests"
                type="number"
              ></InputFormField>
              <Label className="italic">Help us plan wine quantities</Label>
            </div>
            <Label variant="h1">Wine Preferences</Label>
            <InputFormField
              control={form.control}
              name="wine_name"
              label="Preferred Wines or Types"
            ></InputFormField>
            <Label variant="h1">Special Requests</Label>
            <div>
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Experience Notes"
                    placeholder="Any specific instructions for the wines or event?"
                  />
                )}
              />
            </div>
            <FileUploadFormField
              control={form.control}
              name="reference"
              label="Upload Event Inspitation"
            ></FileUploadFormField>
            <Label variant="h1">Budget</Label>
            <InputFormField
              control={form.control}
              name="budget"
              label="Estimated Budget for Wines (Optional)"
            ></InputFormField>
            <LevelButtonGroupFormField
              control={form.control}
              label="Help us tailor the perfect selection"
              name="selection"
              options={selection}
            ></LevelButtonGroupFormField>
            <Label variant="h1">Delivery & Setup</Label>
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
                          setSelectedOption(item.title);
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
                              selectedOption === item.title ? "text-black" : ""
                            }`}
                          >
                            {item.title}
                          </Label>
                          <Label
                            className={`font-thin ${
                              selectedOption === item.title ? "text-black" : ""
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
              Your entertainment request has been received. Your personal
              concierge will confirm availability and follow up shortly.
            </Label>
            <Card className="w-full bg-primary-gray-500/70">
              <CardContent className=" flex flex-col gap-4 bg-transparent">
                <Label className="font-semibold text-primary-brown text-[18px]">
                  Entertainment Summary
                </Label>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label>Occasion</Label>
                    <Label className="font-semibold text-white">
                      {payload?.occasion}
                    </Label>
                  </div>
                  <div className="flex justify-between">
                    <Label>Location</Label>
                    <Label className="font-semibold text-white">
                      {payload?.event_location}
                    </Label>
                  </div>
                  <div className="flex justify-between">
                    <Label>Wine</Label>
                    <Label className="font-semibold text-white">
                      {payload?.wine_name}
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
