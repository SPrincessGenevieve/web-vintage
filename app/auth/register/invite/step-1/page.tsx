"use client";

import InviteHeader from "@/components/auth/invite/InviteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function InviteStep1() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("register_invite_intial_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  const handleNext = () => {
    sessionStorage.setItem("invite_step1_complete", "true");
    router.push("/auth/register/invite/step-2");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <InviteHeader></InviteHeader>
      {show ? (
        <div className="w-full h-full flex gap-4 flex-col overflow-y-auto scroll-area">
          <Card>
            <CardContent className="flex flex-col items-center justify-center">
              <Label variant="p">You were invited by</Label>
              <Label variant="h1" className="">
                John Doe
              </Label>
            </CardContent>
          </Card>
          <Label className="text-center">
            You've been invited to join Vintage Associates. Click below to
            create your account and start investing in fine wines.
          </Label>
          <Button onClick={handleNext}>Create Account</Button>
          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeft /> Back to email entry
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
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
