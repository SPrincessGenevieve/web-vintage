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
import { ActivitiesT, CartItemT, DeliverT, SubAccountType } from "@/lib/types";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDelivery } from "@/context/DeliveryContext";
import { useSubAccount } from "@/context/SubAccountContext";
import { default_profile } from "@/lib/default_profile";
import { Form } from "../ui/form";
import { InputFormField } from "../ui/InputFormField";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Table, TableCell, TableRow } from "../ui/table";
import { ChevronLeft } from "lucide-react";
import PaymentMethodOption from "../PaymentMethodOption";
import { toast } from "sonner";
import { useActivities } from "@/context/ActivitiesContext";
import { numericId, today } from "@/lib/today";
import { useWineCellar } from "@/context/WineCellarContext";

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

export default function DeliverDialog({ item }: { item: CartItemT }) {
  const { delivery, addToDelivery } = useDelivery();
  const { updateWineCellarItem } = useWineCellar();
  const VAT_RATE = 0.2;

  const [initialStep, setInitialStep] = useState(true);
  const { addToActivities } = useActivities();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { subAccounts } = useSubAccount();
  const [payload, setPayload] = useState<DeliverT>();
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

  // Duty rate per litre of pure alcohol (for wine)
  function getDutyRatePerLitrePureAlcohol(abv: number): number {
    if (abv >= 8.5 && abv <= 22) return 29.54;
    if (abv >= 3.5 && abv < 8.5) return 25.67;
    return 0; // negligible duty below 3.5%
  }

  // Delivery cost (your existing logic)
  function calculateDeliveryCost(
    quantity: number,
    caseSize: number,
    bottleSizeCl: number,
  ): number {
    const baseRate = (() => {
      switch (caseSize) {
        case 1:
          return 20;
        case 3:
          return 15;
        case 6:
          return 10;
        case 12:
          return 8;
        default:
          return 0;
      }
    })();

    const sizeSurcharge = (() => {
      if (bottleSizeCl === 75) return 0;
      if (bottleSizeCl === 150) return 5;
      if (bottleSizeCl === 300) return 10;
      if (bottleSizeCl === 600) return 20;
      return 0;
    })();

    const costPerCase = baseRate + sizeSurcharge;
    return quantity * costPerCase;
  }

  // Main calculation
  function calculateWineCosts(item: {
    quantity: number;
    case_size: number;
    bottle_size: "0750" | "1500" | "3000" | "6000";
    abv: number; // alcohol % like 12.5
    market_value: number; // £ per bottle
  }) {
    // Convert bottle size code to centilitres
    const bottleSizeCl =
      item.bottle_size === "0750"
        ? 75
        : item.bottle_size === "1500"
          ? 150
          : item.bottle_size === "3000"
            ? 300
            : item.bottle_size === "6000"
              ? 600
              : 0;

    // Delivery cost
    const deliveryCost = calculateDeliveryCost(
      item.quantity,
      item.case_size,
      bottleSizeCl,
    );

    // Wine product total (wine cost before duty/VAT)
    const wineProductTotal =
      item.market_value * (item.case_size * item.quantity);

    // Duty calculation
    const dutyRate = getDutyRatePerLitrePureAlcohol(item.abv);

    // Litres of wine total (bottleSizeCl is cl)
    const totalWineLitres =
      (bottleSizeCl / 100) * item.case_size * item.quantity;

    // Litres of pure alcohol
    const pureAlcoholLitres = totalWineLitres * (item.abv / 100);

    // Duty amount
    const dutyAmount = dutyRate * pureAlcoholLitres;

    // Subtotal before VAT (wine + duty + delivery)
    const subTotalBeforeVAT = wineProductTotal + dutyAmount + deliveryCost;

    // VAT amounts
    const vatOnWineAndDuty = (wineProductTotal + dutyAmount) * VAT_RATE;
    const vatOnDelivery = deliveryCost * VAT_RATE;

    const totalVAT = vatOnWineAndDuty + vatOnDelivery;

    // Total cost
    const totalCost = subTotalBeforeVAT + totalVAT;

    return {
      deliveryCost,
      wineProductTotal,
      dutyAmount,
      subTotalBeforeVAT,
      vatOnWineAndDuty,
      vatOnDelivery,
      totalVAT,
      totalCost,
    };
  }

  const bottleSize = item.bottle_size;

  const bottleSizeCl =
    bottleSize === "0750"
      ? 75
      : bottleSize === "1500"
        ? 150
        : bottleSize === "3000"
          ? 300
          : bottleSize === "6000"
            ? 600
            : 0;

  function parseABV(value: string | number): number {
    if (typeof value === "number") return value;

    // Remove % and spaces, split on "-"
    const parts = value
      .replace("%", "")
      .split("-")
      .map((p) => parseFloat(p.trim()));

    // Return midpoint if range, else first number, else default
    if (parts.length === 2) return (parts[0] + parts[1]) / 2;
    if (!isNaN(parts[0])) return parts[0];
    return 12.5; // fallback
  }

  const delivery_cost = calculateDeliveryCost(
    item.quantity,
    item.case_size,
    bottleSizeCl,
  );

  const market_value =
    item.basket !== null
      ? item.basket.market_value
      : (item.stock_wine_vintage?.market_value ?? 0);

  const calculation_data = {
    quantity: item.quantity,
    case_size: item.case_size,
    bottle_size: item.bottle_size as "0750" | "1500" | "3000" | "6000", // type assertion
    abv: parseABV(item.alcohol_abv),
    market_value: market_value, // £50 per bottle
  };

  const result = calculateWineCosts(calculation_data);
  const formattedResult = Object.fromEntries(
    Object.entries(result).map(([key, value]) => [
      key,
      // format number to 2 decimals and local string
      typeof value === "number"
        ? value.toLocaleString("en-GB", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : value,
    ]),
  );

  const wine_details_table = [
    {
      title: "Vintage",
      value: item.vintage,
    },
    {
      title: "Market Price",
      value: `£ ${market_value.toLocaleString()}`,
    },
    {
      title: "Cases",
      value: item.quantity,
    },
    {
      title: "Total",
      value: `£ ${formattedResult.wineProductTotal}`,
    },
  ];

  const summary_table = [
    {
      title: "Wine Product Total",
      value: `£ ${formattedResult.wineProductTotal}`,
    },
    {
      title: "Delivery Cost",
      value: `£ ${delivery_cost}`,
    },
    {
      title: "Duty (Alcohol Tax)",
      value: `£ ${formattedResult.dutyAmount}`,
    },
    {
      title: "Subtotal (Before VAT)",
      value: `£ ${formattedResult.subTotalBeforeVAT}`,
    },
    {
      title: "VAT (on Wine and Duty)",
      value: `£ ${formattedResult.vatOnWineAndDuty}`,
    },
    {
      title: "VAT (On Delivery)",
      value: `£ ${formattedResult.vatOnDelivery}`,
    },
    {
      title: "Total Cost",
      value: `£ ${formattedResult.totalCost}`,
    },
  ];

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      setInitialStep(false);
      const newPayload: DeliverT = {
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
        fee: result.totalCost,
        status: "Pending",
      };

      // Update state
      setPayload(newPayload);

      console.log("PAYLOAD: ", payload);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = () => {
    if (!payload) {
      return;
    }

    const wine_id = payload.wine.id;

    // Check if this wine already exists in delivery
    const alreadyRequested = delivery.some((d) => d.wine?.id === wine_id);

    if (alreadyRequested) {
      toast.warning("This wine has already been requested.");
      return;
    }

    const activity_payload: ActivitiesT = {
      id: `activity-deliver-${uuidv4()}`,
      type: "Trading",
      date: today,
      action: "Deliver Request",
      detail: {
        wine_name: item.wine_name,
        status: "Requested",
        vintage: 0,
        quantity: item.quantity,
        case_size: item.case_size,
        details_wine: item,
        purchase_price:
          item.basket !== null
            ? (item.basket?.market_value ?? 0)
            : (item.stock_wine_vintage?.market_value ?? 0),
        bottle_size:
          item.basket !== null
            ? (item?.basket_items?.[0].basket_bottle_size ?? "")
            : (item.bottle_size ?? ""),
      },
      fees_summary: {
        wine_product_total: formattedResult.wineProductTotal,
        delivery_cost: delivery_cost,
        duty: formattedResult.dutyAmount,
        sub_total_before_tax: formattedResult.subTotalBeforeVAT,
        vat_wine_and_futy: formattedResult.vatOnWineAndDuty,
        vat_delivery: formattedResult.vatOnDelivery,
        total_cost: formattedResult.totalCost,
      },
      delivery_detail: payload,
    };

    addToDelivery(payload);
    addToActivities(activity_payload);
    updateWineCellarItem(item.id, {
      status: "Deliver Request",
    });

    toast.success("Your delivery request has been received.");

    form.reset({
      first_name: activeAccount?.first_name || "",
      last_name: activeAccount?.last_name || "",
      email: default_profile.email || "",
      phone: default_profile.phone || "",
      postal_code: default_profile.postal_code || "",
      country: default_profile.country || "",
      address_1: "",
      address_2: "",
    });

    setInitialStep(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={item.status !== "In Bond" ? true : false}
        className="w-full"
      >
        <Button
          disabled={item.status !== "In Bond" ? true : false}
          className="w-full"
        >
          Deliver
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90%]">
        <DialogHeader>
          {!initialStep && (
            <div>
              <Button
                onClick={() => setInitialStep(true)}
                variant={"ghost"}
                className="w-12"
              >
                <ChevronLeft></ChevronLeft> Back
              </Button>
            </div>
          )}
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
            <div className="w-full flex flex-col gap-4">
              <Card className="bg-primary-gray-500/70">
                <CardContent className="bg-transparent flex gap-4 flex-col items-center justify-center">
                  <Image
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-full max-h-72 rounded-2xl object-contain"
                    src={
                      item.basket === null ? item.images[0] : item.basket.image
                    }
                  ></Image>
                  <div className="w-full">
                    <Label>
                      {item.case_size}x{bottleSizeCl}cl
                    </Label>
                  </div>
                </CardContent>
              </Card>
              <div>
                <div className="flex flex-col gap-4">
                  <Label variant="h2" className="text-white">
                    {item.wine_name}
                  </Label>
                  <div className=" bg-primary-gray-500/70 rounded-2xl p-2">
                    <Table>
                      {wine_details_table.map((item, index) => (
                        <TableRow className="border-transparent">
                          <TableCell className="w-45">
                            <Label>{item.title}</Label>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center justify-end">
                              <Label className="text-white font-medium">
                                {item.value}
                              </Label>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label variant="h2" className="text-white">
                  Fees Summary
                </Label>
                <div className=" bg-primary-gray-500/70 rounded-2xl p-2">
                  <Table>
                    {summary_table.map((item, index) => (
                      <TableRow className="border-transparent">
                        <TableCell className="w-45">
                          <Label>{item.title}</Label>
                        </TableCell>
                        <TableCell>
                          <div className="w-full flex items-center justify-end">
                            <Label className="text-white font-medium">
                              {item.value}
                            </Label>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </div>
              </div>
              <PaymentMethodOption></PaymentMethodOption>
              <div className="flex w-full items-center justify-end">
                <Button onClick={handleDeliver}>Proceed to Pay Now</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
