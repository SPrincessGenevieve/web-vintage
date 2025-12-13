"use client";

import SingleHeader from "@/components/auth/invite/SingleHeader";
import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, TrendingDown } from "lucide-react";
import { agreement, agreement_list_2 } from "@/lib/selection";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AgreementDialog from "@/components/auth/AgreementDialog";
import { Alert } from "@/components/ui/alert";

export default function page() {
  const {
    setUserDetails,
    agree_terms_condition,
    agree_collection_warning,
    agree_liquidity_risk,
    agree_price_risk,
  } = useUserContext();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("invite_step2_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  const onSubmit = () => {
    if (
      !agree_terms_condition ||
      !agree_collection_warning ||
      !agree_liquidity_risk ||
      !agree_price_risk
    ) {
      setOpen(true);
    } else {
      sessionStorage.setItem("invite_step4_complete", "true");
      router.push("/auth/register/invite/step-5");
    }
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <SingleHeader></SingleHeader>
      <Progress value={60}></Progress>
      <div className="flex flex-col gap-4 h-[80vh] overflow-y-auto scroll-area">
        <Card className="bg-primary-gray-600">
          <CardContent className="bg-primary-gray-600">
            <CardHeader className="flex flex-col justify-center items-center">
              <CardTitle className="text-white text-center">
                Risk Warnings
              </CardTitle>
              <Label variant="p" className="text-center">
                Acknowledge and continue
              </Label>
              <Label variant="p" className="text-center">
                Wine investment carries risks and values can fluctuate. While
                returns are not guaranteed, you will always own your wines. Only
                invest what you can commit for the long term.
              </Label>
            </CardHeader>
          </CardContent>
        </Card>
        {agreement.map((item, index) => (
          <Card key={index}>
            <CardContent className="">
              <CardHeader className="p-0">
                <CardTitle className="flex items-center gap-4 text-white">
                  <item.icon
                    className={`${
                      index === 1
                        ? "text-primary-brown"
                        : "text-primary-red-200"
                    }`}
                  ></item.icon>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <Label>{item.description}</Label>
              <div className="flex gap-4 mt-4">
                <Checkbox
                  checked={
                    index === 0
                      ? agree_collection_warning
                      : index === 1
                      ? agree_liquidity_risk
                      : agree_price_risk
                  }
                  onCheckedChange={(value) =>
                    index === 0
                      ? setUserDetails({
                          agree_collection_warning: value === true,
                        })
                      : index === 1
                      ? setUserDetails({
                          agree_liquidity_risk: value === true,
                        })
                      : setUserDetails({
                          agree_price_risk: value === true,
                        })
                  }
                  id={item.title}
                ></Checkbox>
                <Label htmlFor={item.title}>{item.details}</Label>
              </div>
            </CardContent>
          </Card>
        ))}
        <AgreementDialog></AgreementDialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <div className="flex gap-2">
              <AlertCircleIcon></AlertCircleIcon>
              <Label>Please check all boxes to proceed.</Label>
            </div>
          </DialogContent>
        </Dialog>
        <Button onClick={onSubmit}>Next</Button>
      </div>
    </div>
  );
}
