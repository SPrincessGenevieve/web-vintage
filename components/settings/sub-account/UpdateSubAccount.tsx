"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SubAccountType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useSubAccount } from "@/context/SubAccountContext";
import { toast } from "sonner";
import { ImageUploadFormField } from "@/components/ui/ImageUploadFormField";
import { InputFormField } from "@/components/ui/InputFormField";
import { SimpleDropdownInput } from "@/components/ui/simple-dropdown-input";
import { CalendarFormField } from "@/components/ui/CalendarFormField";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { relationship_option } from "./AddSubAccount";
import { Switch } from "@/components/ui/switch";

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

export default function UpdateSubAccount({
  item,
  index,
}: {
  item: SubAccountType;
  index: number;
}) {
  const { addSubAccount, removeSubAccount, updateSubAccount } = useSubAccount();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(item.is_active);
  }, [item.is_active]);

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: item.first_name || "",
      last_name: item.last_name || "",
      image: base64ToFile(item.image),
      relationship: item.relationship || "",
      birthDate: item?.birth_date ? new Date(item.birth_date) : undefined,
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
      const imageBase64 = await fileToBase64(values.image);
      updateSubAccount(item.id, {
        first_name: values.first_name,
        last_name: values.last_name,
        image: imageBase64,
        relationship: values.relationship,
        birth_date: values.birthDate.toISOString(),
      });
      toast.success(
        `Sub-account ${values.first_name} ${values.last_name} has been updated successfully.`
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDel = () => {
    setOpen(false);
    toast.success("Account deleted successfully.");
    removeSubAccount(item.id);
  };

  const handleActive = () => {
    updateSubAccount(item.id, {
      is_active: !checked,
    });
  };

  return (
    <div className="flex items-center gap-2 border-b border-primary-brown/30 transition ease-in-out hover:bg-primary-gray-500/30 p-2">
      <Dialog>
        <DialogTrigger
          disabled={item.id === "1" ? true : false}
          className="w-full"
        >
          <div key={index} className="flex w-full gap-2 ">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={item.image}
              ></AvatarImage>
            </Avatar>
            <Label className="w-full text-left">
              {item.last_name}, {item.first_name.slice()[0]}.
            </Label>
          </div>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[90%]">
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
                <div className="w-full flex gap-2 justify-end">
                  <Button
                    type="button"
                    onClick={handleDel}
                    className="bg-red-700 hover:bg-red-700/50 text-white"
                  >
                    Delete Account
                  </Button>
                  <Button id="submit">
                    {loading ? <Spinner></Spinner> : "Update Sub-account"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <Switch
        onClick={handleActive}
        checked={checked}
        onCheckedChange={setChecked}
      ></Switch>
    </div>
  );
}
