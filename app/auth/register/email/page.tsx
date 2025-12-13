"use client";

import LandingHeader from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmailCheck() {
  const { setUserDetails, register_email } = useUserContext();

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: register_email || "",
    },
  });

  const handleNext = (values: FormValues) => {
    if (values.email === "xyz@gmail.com") {
      router.push("/auth/register/invite/step-1");
      sessionStorage.setItem("register_invite_intial_complete", "true");
    } else {
      sessionStorage.setItem("register_intial_complete", "true");
      router.push("/auth/register/step-1");
    }
  };

  return (
    <div className="w-full max-w-[50vh] flex flex-col gap-4">
      <LandingHeader></LandingHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className="flex w-full flex-col gap-4"
        >
          <InputFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            type="email"
            onChange={(value) =>
              setUserDetails({
                register_email: value,
              })
            }
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
