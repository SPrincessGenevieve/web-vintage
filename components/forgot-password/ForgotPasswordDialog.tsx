"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useUserContext } from "@/context/UserContext";
import { Label } from "../ui/label";
import { CircleCheck } from "lucide-react";

export default function ForgotPasswordDialog() {
  const { setUserDetails, forgot_pass_success } = useUserContext();
  const [open, setOpen] = useState(forgot_pass_success);

  useEffect(() => {
    setUserDetails({
      forgot_pass_success: open,
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Label variant="h2" className="text-white">
              Success
            </Label>
          </DialogTitle>
          <div className="flex flex-row gap-4">
            <CircleCheck size={25} className="text-green-500"></CircleCheck>
            <Label>Password reset email has been sent.</Label>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
