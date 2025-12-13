"use client";

import SingleHeader from "@/components/auth/invite/SingleHeader";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";

export default function Fallback() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { setUserDetails } = useUserContext();
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("invite_step4_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  useEffect(() => {
    setTimeout(() => setVerify(true), 3000);
  });

  const backtoLogin = () => {
    sessionStorage.removeItem("invite_step1_complete");
    sessionStorage.removeItem("invite_step2_complete");
    sessionStorage.removeItem("invite_step3_complete");
    sessionStorage.removeItem("invite_step4_complete");
    sessionStorage.removeItem("register_invite_intial_complete");
    sessionStorage.removeItem("register_intial_complete");
    setUserDetails({
      agree_terms_condition: false,
      agree_price_risk: false,
      agree_liquidity_risk: false,
      agree_collection_warning: false,
      invite_step_two: null,
      invite_step_three: null,
      register_email: "",
    });
    router.replace("/");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <SingleHeader></SingleHeader>
      {verify ? (
        <>
          <Progress value={100}></Progress>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Label variant="h1" className="text-center">
              Verification in progres
            </Label>
            <Label className="text-center">
              Our team is manually reviewing your identity. This may take up to
              a few business days.
            </Label>
            <Label className="text-center">
              You'll get an email once your verification is complete.
            </Label>
          </div>
          <Button className="my-4" onClick={backtoLogin}>
            Return to Login
          </Button>
        </>
      ) : (
        <>
          <Progress value={80}></Progress>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Label className="text-center" variant="h1">
              Verifying your identity...
            </Label>
            <Label className="text-center">
              Please wait while we confirm your ID.
            </Label>
            <div className="my-8">
              <Spinner className="text-white/70 w-15 h-15"></Spinner>
            </div>
            <Label className="text-center">This won't take long.</Label>
          </div>
        </>
      )}
    </div>
  );
}
