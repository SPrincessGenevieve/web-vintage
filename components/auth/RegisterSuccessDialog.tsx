"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { CircleCheck } from "lucide-react";
import { useUserContext } from "@/context/UserContext";

export default function RegisterSuccessDialog() {
  const { register_success, setUserDetails } = useUserContext();
  const [open, setOpen] = useState(register_success);

  useEffect(() => {
    setUserDetails({
      register_success: open,
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Label variant="h2" className="text-white">
              What happens next?
            </Label>
          </DialogTitle>
          <div className="flex flex-row gap-4">
            <CircleCheck size={25} className="text-green-500"></CircleCheck>
            <Label>
              The first part of your membership form has been received, we will
              review your application and be in contact with you through email.
            </Label>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
