"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import React from "react";

export default function UnavailableDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wine Unavailable for Purchase</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This wine is currently not available for purchase. However, you can
          still view its details, including tasting notes, origin, and vintage
          information.
        </DialogDescription>
        <DialogDescription className="flex gap-2 items-center">
          Tap the <Bell size={14}></Bell> to get notified once this wine becomes
          available again.
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
