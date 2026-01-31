"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { Label } from "@/components/ui/label";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  investment: z.string().refine((val) => Number(val) >= 1000, {
    message: "Investment must be at least 1000",
  }),
  holding_period: z.string().min(1, {
    message: "Please select a holding period",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Step2({ next, id }: { next: () => void; id: string }) {
  const { updatePortfolioBuilderItem, portfolio_builder } =
    usePortfolioBuilder();
  const item = portfolio_builder[0];
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investment: String(item.investment ?? 1000),
      holding_period: item.holding_period ?? "5",
    },
  });

  const holding_years = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
    { label: "50", value: "50" },
  ];

  const onSubmit = (data: FormValues) => {
    // convert ONLY when needed
    const payload = {
      ...data,
      investment: Number(data.investment),
      holding_period: Number(data.holding_period),
    };
    updatePortfolioBuilderItem(id, {
      investment: Number(data.investment),
      holding_period: data.holding_period,
    });
    console.log(payload);
    next(); // only runs if validation passes
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      <Card className="bg-primary-gray-500/50">
        <CardContent className="p-4 flex flex-col bg-transparent gap-4">
          <Label className="text-white">
            How much would you like to invest in fine wine?
          </Label>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <InputFormField
                  control={form.control}
                  name="investment"
                  label="Investment"
                  classNameLabel="text-primary-brown"
                />
                <Label className="font-thin">Minimum investment: £ 1,000</Label>
              </div>

              <div>
                <DropdownFormField
                  control={form.control}
                  name="holding_period"
                  label="Holding Period (Years)"
                  options={holding_years}
                  classNameLabel="text-primary-brown"
                />
                <Label className="font-thin">
                  Fine wine typically over 5–50 years
                </Label>
              </div>

              <Button type="submit">Continue</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
