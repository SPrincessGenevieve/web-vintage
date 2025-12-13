"use client";

import SingleHeader from "@/components/auth/invite/SingleHeader";
import { Button } from "@/components/ui/button";
import { CombineCountrySelect } from "@/components/ui/combine-country-select";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { Progress } from "@/components/ui/progress";
import { SimpleDropdownInput } from "@/components/ui/simple-dropdown-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { country_list, holding_time, office_region } from "@/lib/selection";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  depositAmount: z.string().refine(
    (val) => {
      const num = Number(val.replace(/,/g, "")); // remove commas if user inputs "50,000"
      return !isNaN(num) && num >= 50000;
    },
    { message: "Deposit amount must be at least 50,000." }
  ),
  holdingTime: z.string().min(2, { message: "This field is required." }),
  experience: z.string().min(2, { message: "This field is required." }),
  region: z.string().min(2, { message: "This field is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function InviteStep3() {
  const router = useRouter();
  const { invite_step_three, setUserDetails } = useUserContext();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("invite_step2_complete");
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
      depositAmount: String(invite_step_three?.depositAmount),
      holdingTime: invite_step_three?.holdinPeriod,
      experience: invite_step_three?.isFirstTime,
      region: invite_step_three?.region,
    },
  });

  const onSubmit = (values: FormValues) => {
    sessionStorage.setItem("invite_step3_complete", "true");
    router.push("/auth/register/invite/step-4");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <SingleHeader></SingleHeader>
      <Progress value={40}></Progress>

      {show ? (
        <>
          <div className="w-full  h-[80vh] overflow-y-auto scroll-area">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <InputFormField
                  control={form.control}
                  name="depositAmount"
                  label="How much do you want to deposit?"
                  placeholder="50,000"
                  type="number"
                  onChange={(value) =>
                    setUserDetails({
                      invite_step_three: {
                        depositAmount: Number(value),
                        holdinPeriod: invite_step_three?.holdinPeriod ?? "",
                        isFirstTime: invite_step_three?.isFirstTime ?? "",
                        region: invite_step_three?.region ?? "",
                      },
                    })
                  }
                />
                <SimpleDropdownInput
                  control={form.control}
                  name="holdingTime"
                  label="How long do you plan on holding wine for?"
                  options={holding_time}
                  onChange={(value) =>
                    setUserDetails({
                      invite_step_three: {
                        depositAmount:
                          Number(invite_step_three?.depositAmount) ?? "",
                        holdinPeriod: value,
                        isFirstTime: invite_step_three?.isFirstTime ?? "",
                        region: invite_step_three?.region ?? "",
                      },
                    })
                  }
                ></SimpleDropdownInput>
                <SimpleDropdownInput
                  control={form.control}
                  name="experience"
                  label="Is this the first time collecting fine wines?"
                  options={[
                    {
                      label: "Yes",
                      value: "Yes",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ]}
                  includeOther={false}
                  onChange={(value) =>
                    setUserDetails({
                      invite_step_three: {
                        depositAmount:
                          Number(invite_step_three?.depositAmount) ?? "",
                        holdinPeriod: invite_step_three?.holdinPeriod ?? "",
                        isFirstTime: value,
                        region: invite_step_three?.region ?? "",
                      },
                    })
                  }
                ></SimpleDropdownInput>
                <SimpleDropdownInput
                  control={form.control}
                  name="region"
                  label="Where is your nearest Vintage Assiciates regional office?"
                  options={office_region}
                  includeOther={false}
                  onChange={(value) =>
                    setUserDetails({
                      invite_step_three: {
                        depositAmount:
                          Number(invite_step_three?.depositAmount) ?? "",
                        holdinPeriod: invite_step_three?.holdinPeriod ?? "",
                        isFirstTime: invite_step_three?.isFirstTime ?? "",
                        region: value,
                      },
                    })
                  }
                ></SimpleDropdownInput>
                <Button>Next</Button>
              </form>
            </Form>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 w-full">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
