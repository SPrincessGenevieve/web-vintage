"use client";

import SingleHeader from "@/components/auth/invite/SingleHeader";
import { Button } from "@/components/ui/button";
import { CalendarFormField } from "@/components/ui/CalendarFormField";
import { CombinePhoneSelect } from "@/components/ui/combine-phone-select";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { country_list } from "@/lib/selection";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "This field is required." }),
    lastName: z.string().min(2, { message: "This field is required." }),
    birthDate: z
      .date()
      .refine((date) => !!date, { message: "Please select your birth date" })
      .refine(
        (date) => {
          if (!date) return false;
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
    dialCode: z.string().min(2, { message: "Mandatory" }),
    phoneNumber: z.string().min(2, { message: "This field is required." }),
    email: z.string().email({ message: "Invalid email address" }),
    password1: passwordSchema,
    password2: z.string().min(2, { message: "This field is required." }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"], // attach error to password2 field
  });

type FormValues = z.infer<typeof formSchema>;

export default function InviteStep2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { invite_step_two, setUserDetails } = useUserContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // ✅ Connect Zod schema
    defaultValues: {
      firstName: invite_step_two?.firstname || "",
      lastName: invite_step_two?.lastname || "",
      birthDate: invite_step_two?.birthDate
        ? new Date(invite_step_two?.birthDate)
        : undefined,
      dialCode: invite_step_two?.code || "",
      phoneNumber: invite_step_two?.phoneNumber || "",
      email: invite_step_two?.email || "",
      password1: "",
      password2: "",
    },
  });

  useEffect(() => {
    const done = sessionStorage.getItem("invite_step1_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  const onSubmit = (values: FormValues) => {
    sessionStorage.setItem("invite_step2_complete", "true");
    router.push("/auth/register/invite/step-3");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <SingleHeader></SingleHeader>
      <Progress value={20}></Progress>
      {show ? (
        <div className="w-full  h-[80vh] overflow-y-auto scroll-area">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputFormField
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                onChange={(value) =>
                  setUserDetails({
                    invite_step_two: {
                      firstname: value,
                      lastname: invite_step_two?.lastname ?? "",
                      birthDate: invite_step_two?.birthDate ?? "",
                      code: invite_step_two?.code ?? "",
                      phoneNumber: invite_step_two?.phoneNumber ?? "",
                      email: invite_step_two?.email ?? "",
                    },
                  })
                }
              />
              <InputFormField
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                onChange={(value) =>
                  setUserDetails({
                    invite_step_two: {
                      firstname: invite_step_two?.firstname ?? "",
                      lastname: value,
                      birthDate: invite_step_two?.birthDate ?? "",
                      code: invite_step_two?.code ?? "",
                      phoneNumber: invite_step_two?.phoneNumber ?? "",
                      email: invite_step_two?.email ?? "",
                    },
                  })
                }
              />
              <CalendarFormField
                control={form.control}
                name="birthDate"
                label="Birth Date"
                placeholder="Select date of birth"
                onChange={(value) =>
                  setUserDetails({
                    invite_step_two: {
                      firstname: invite_step_two?.firstname ?? "",
                      lastname: invite_step_two?.lastname ?? "",
                      birthDate: value?.toISOString() ?? "",
                      code: invite_step_two?.code ?? "",
                      phoneNumber: invite_step_two?.phoneNumber ?? "",
                      email: invite_step_two?.email ?? "",
                    },
                  })
                }
              />
              <div className="w-full gap-4 flex flex-row items-center">
                <div>
                  <CombinePhoneSelect
                    control={form.control}
                    name="dialCode"
                    label="Code"
                    placeholder=""
                    options={country_list}
                    onChange={(value) =>
                      setUserDetails({
                        invite_step_two: {
                          firstname: invite_step_two?.firstname ?? "",
                          lastname: invite_step_two?.lastname ?? "",
                          birthDate: invite_step_two?.birthDate ?? "",
                          code: value,
                          phoneNumber: invite_step_two?.phoneNumber ?? "",
                          email: invite_step_two?.email ?? "",
                        },
                      })
                    }
                  ></CombinePhoneSelect>
                </div>
                <InputFormField
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  onChange={(value) =>
                    setUserDetails({
                      invite_step_two: {
                        firstname: invite_step_two?.firstname ?? "",
                        lastname: invite_step_two?.lastname ?? "",
                        birthDate: invite_step_two?.birthDate ?? "",
                        code: invite_step_two?.code ?? "",
                        phoneNumber: value,
                        email: invite_step_two?.email ?? "",
                      },
                    })
                  }
                />
              </div>
              <InputFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="john@gmail.com"
                type="email"
                onChange={(value) =>
                  setUserDetails({
                    invite_step_two: {
                      firstname: invite_step_two?.firstname ?? "",
                      lastname: invite_step_two?.lastname ?? "",
                      birthDate: invite_step_two?.birthDate ?? "",
                      code: invite_step_two?.code ?? "",
                      phoneNumber: invite_step_two?.phoneNumber ?? "",
                      email: value,
                    },
                  })
                }
              />
              <InputFormField
                control={form.control}
                name="password1"
                label="Password"
                placeholder="********"
                type="password"
              />
              <InputFormField
                control={form.control}
                name="password2"
                label="Confirm Password"
                placeholder="********"
                type="password"
              />

              <Button id="submit">Next</Button>
            </form>
          </Form>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2 w-full">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
