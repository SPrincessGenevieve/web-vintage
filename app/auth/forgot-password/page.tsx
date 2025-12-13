"use client";

import ForgotPassHeader from "@/components/forgot-password/ForgotPassHeader";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputFormField } from "@/components/ui/InputFormField";
import { Spinner } from "@/components/ui/spinner";
import { useUserContext } from "@/context/UserContext";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUserDetails } = useUserContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleNext = () => {
    setLoading(true);
    setUserDetails({
      forgot_pass_success: true,
    });
    router.push("/");
  };

  return (
    <div className="w-full max-w-[50vh] flex flex-col  my-4">
      <ForgotPassHeader></ForgotPassHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className="flex w-full flex-col gap-8"
        >
          <InputFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            type="email"
          />
          <Button type="submit">
            {loading ? <Spinner /> : "Send Request"}
          </Button>
        </form>
      </Form>
      <div className="flex flex-row gap-2 items-center">
        <Label>Already reset the password?</Label>
        <Button
          onClick={() => router.push("/")}
          className="p-0 text-primary-brown"
          variant={"link"}
        >
          Sign-in
        </Button>
      </div>
    </div>
  );
}
