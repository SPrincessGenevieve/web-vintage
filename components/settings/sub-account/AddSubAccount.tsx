"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { CalendarFormField } from "@/components/ui/CalendarFormField";
import { FileUploadFormField } from "@/components/ui/FileUploadFormField";
import { SimpleDropdownInput } from "@/components/ui/simple-dropdown-input";
import { Button } from "@/components/ui/button";
import { useSubAccount } from "@/context/SubAccountContext";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ImageUploadFormField } from "@/components/ui/ImageUploadFormField";

export const relationship_option = [
  {
    label: "Daughter",
    value: "Daughter",
  },
  {
    label: "Son",
    value: "Son",
  },
  {
    label: "Niece",
    value: "Niece",
  },
  {
    label: "Nephew",
    value: "Nephew",
  },
  {
    label: "Wife",
    value: "Wife",
  },
];

const formSchema = z.object({
  first_name: z.string().min(2, { message: "This field is required." }),
  last_name: z.string().min(2, { message: "This field is required." }),
  image: z
    .instanceof(File, { message: "Please upload a profile picture" })
    .refine((file) => file.size <= 5_000_000, {
      message: "File size must be ≤ 5MB",
    }),
  relationship: z.string().min(2, { message: "This field is required." }),
  birthDate: z
    .date()
    .refine((date) => !!date, { message: "Please select your birth date" })
    .refine(
      (date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return date <= eighteenYearsAgo;
      },
      { message: "You must be at least 18 years old" }
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddSubAccount() {
  const { addSubAccount, subAccounts } = useSubAccount();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("SUB-ACCOUNTS: ", subAccounts);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      image: undefined,
      relationship: "",
      birthDate: undefined,
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
      const subAccountId = uuidv4();
      const imageBase64 = await fileToBase64(values.image);

      addSubAccount({
        id: subAccountId,
        first_name: values.first_name,
        last_name: values.last_name,
        image: imageBase64,
        relationship: values.relationship,
        birth_date: values.birthDate.toISOString(),
      });

      toast.success(
        `Sub-account ${values.first_name} ${values.last_name} has been created successfully.`
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <div className="border-b border-primary-brown/30 transition ease-in-out hover:bg-primary-gray-500/30 p-2">
          <Label>
            Add Sub-account <Plus size={18}></Plus>
          </Label>
        </div>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add the sub-account</DialogTitle>
          <DialogDescription>
            Creating a sub-account in a loved one’s name is a meaningful and
            forward-thinking way to gift a tangible, appreciating asset. Each
            sub-account is fully independent, with its own portfolio and
            performance tracking—ideal for children, partners, or family members
            you want to invest on behalf of. From within the app, you can
            seamlessly switch between your main account and any sub-accounts,
            maintaining full oversight and control. To set one up, we just need
            a few basic details listed below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <ImageUploadFormField
                control={form.control}
                name="image"
                label="Upload ID Document"
                accept="image/*,application/pdf"
              ></ImageUploadFormField>
              <InputFormField
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="John"
              />
              <InputFormField
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="John"
              />
              <SimpleDropdownInput
                control={form.control}
                name="relationship"
                label="Relationship"
                placeholder=""
                options={relationship_option}
              />
              <CalendarFormField
                control={form.control}
                name="birthDate"
                label="Birth Date"
                placeholder="Select date of birth"
              />
              <Button id="submit">
                {loading ? <Spinner></Spinner> : "Create Sub-account"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
