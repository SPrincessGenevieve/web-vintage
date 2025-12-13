"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { InputFormField } from "@/components/ui/InputFormField";
import { CalendarFormField } from "@/components/ui/CalendarFormField";
import RegisterHeader from "@/components/auth/RegisterHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  mobileNo: z.string().min(8, { message: "Enter a valid mobile number" }),
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
});

type FormValues = z.infer<typeof formSchema>;

export default function Step1() {
  const router = useRouter();
  const { setUserDetails, register_step_one } = useUserContext();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const done = sessionStorage.getItem("register_intial_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // ✅ Connect Zod schema
    defaultValues: {
      email: register_step_one?.email || "",
      fullname: register_step_one?.fullname || "",
      mobileNo: register_step_one?.mobileNumber || "",
      birthDate: register_step_one?.birthDate
        ? new Date(register_step_one.birthDate)
        : undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    sessionStorage.setItem("register_step1_complete", "true");
    router.push("/auth/register/step-2");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      {/* Header */}
      <RegisterHeader step={1}></RegisterHeader>
      {show ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="john@gmail.com"
                type="email"
                onChange={(value) =>
                  setUserDetails({
                    register_step_one: {
                      email: value,
                      fullname: register_step_one?.fullname ?? "",
                      mobileNumber: register_step_one?.mobileNumber ?? "",
                      birthDate: register_step_one?.birthDate ?? "",
                    },
                  })
                }
              />
              <InputFormField
                control={form.control}
                name="fullname"
                label="Fullname"
                placeholder="John Doe"
                onChange={(value) =>
                  setUserDetails({
                    register_step_one: {
                      email: register_step_one?.email ?? "",
                      fullname: value,
                      mobileNumber: register_step_one?.mobileNumber ?? "",
                      birthDate: register_step_one?.birthDate ?? "",
                    },
                  })
                }
              />

              <InputFormField
                control={form.control}
                name="mobileNo"
                label="Mobile Number"
                placeholder="+44 7700 900123"
                onChange={(value) =>
                  setUserDetails({
                    register_step_one: {
                      email: register_step_one?.email ?? "",
                      fullname: register_step_one?.fullname ?? "",
                      mobileNumber: value,
                      birthDate: register_step_one?.birthDate ?? "",
                    },
                  })
                }
              />
              <CalendarFormField
                control={form.control}
                name="birthDate"
                label="Birth Date"
                onChange={(value) =>
                  setUserDetails({
                    register_step_one: {
                      email: register_step_one?.email ?? "",
                      fullname: register_step_one?.fullname ?? "",
                      mobileNumber: register_step_one?.mobileNumber ?? "",
                      birthDate: value?.toISOString() ?? "",
                    },
                  })
                }
              />

              <Button type="submit">
                {loading ? <Spinner /> : "Continue"}
              </Button>
            </form>
          </Form>

          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeft /> Back to email entry
          </Button>
        </>
      ) : (
        <div className="flex flex-col w-full items-center space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 w-full">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      )}
      {/* Form */}
    </div>
  );
}
