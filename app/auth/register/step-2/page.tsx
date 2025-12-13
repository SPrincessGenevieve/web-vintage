"use client";
import RegisterHeader from "@/components/auth/RegisterHeader";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { countries, country_list } from "@/lib/selection";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CombineCountrySelect } from "@/components/ui/combine-country-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  streetAddress: z
    .string()
    .min(2, { message: "Street address must be at least 2 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  county: z
    .string()
    .min(2, { message: "County must be at least 2 characters" }),
  postalCode: z
    .string()
    .min(2, { message: "Postal code must be at least 2 characters" }),
  country: z
    .string()
    .refine((val) => country_list.some((c) => c.value === val), {
      message: "Select a valid country",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Step2() {
  const router = useRouter();
  const { setUserDetails, register_step_two } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("register_step1_complete");
    if (!done) {
      setShow(false);
      router.back(); // redirect them back
    } else {
      setShow(true);
    }
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // ✅ Connect Zod schema
    defaultValues: {
      streetAddress: register_step_two?.streetAddress || "",
      city: register_step_two?.city || "",
      county: register_step_two?.county || "",
      postalCode: register_step_two?.postalCode || "",
      country: register_step_two?.country || "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    sessionStorage.setItem("register_step2_complete", "true");
    router.push("/auth/register/step-3");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <RegisterHeader step={2}></RegisterHeader>
      {show ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputFormField
                control={form.control}
                name="streetAddress"
                label="Street Address"
                placeholder=""
                onChange={(value) =>
                  setUserDetails({
                    register_step_two: {
                      streetAddress: value,
                      city: register_step_two?.city ?? "",
                      county: register_step_two?.county ?? "",
                      postalCode: register_step_two?.postalCode ?? "",
                      country: register_step_two?.country ?? "",
                    },
                  })
                }
              ></InputFormField>
              <InputFormField
                control={form.control}
                name="city"
                label="City"
                placeholder=""
                onChange={(value) =>
                  setUserDetails({
                    register_step_two: {
                      streetAddress: register_step_two?.streetAddress ?? "",
                      city: value,
                      county: register_step_two?.county ?? "",
                      postalCode: register_step_two?.postalCode ?? "",
                      country: register_step_two?.country ?? "",
                    },
                  })
                }
              ></InputFormField>
              <InputFormField
                control={form.control}
                name="county"
                label="County"
                placeholder=""
                onChange={(value) =>
                  setUserDetails({
                    register_step_two: {
                      streetAddress: register_step_two?.streetAddress ?? "",
                      city: register_step_two?.city ?? "",
                      county: value,
                      postalCode: register_step_two?.postalCode ?? "",
                      country: register_step_two?.country ?? "",
                    },
                  })
                }
              ></InputFormField>
              <InputFormField
                control={form.control}
                name="postalCode"
                label="Postal Code"
                placeholder=""
                onChange={(value) =>
                  setUserDetails({
                    register_step_two: {
                      streetAddress: register_step_two?.streetAddress ?? "",
                      city: register_step_two?.city ?? "",
                      county: register_step_two?.county ?? "",
                      postalCode: value,
                      country: register_step_two?.country ?? "",
                    },
                  })
                }
              ></InputFormField>

              <CombineCountrySelect
                control={form.control}
                name="country"
                label="Country"
                placeholder="Select your country"
                options={country_list}
                onChange={(value) =>
                  setUserDetails({
                    register_step_two: {
                      streetAddress: register_step_two?.streetAddress ?? "",
                      city: register_step_two?.city ?? "",
                      county: register_step_two?.county ?? "",
                      postalCode: register_step_two?.postalCode ?? "",
                      country: value,
                    },
                  })
                }
              />
              <Button type="submit">
                {loading ? <Spinner /> : "Continue"}
              </Button>
            </form>
          </Form>
          <Button variant={"ghost"} onClick={() => router.back()}>
            <ArrowLeft></ArrowLeft>Back
          </Button>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full items-center space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
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
