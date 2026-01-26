"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { StorageInviteT } from "@/lib/types";
import { useBook } from "@/context/BookContext";
import { booking_list } from "@/lib/booking_list";
import { Label } from "../ui/label";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function BookInvite() {
  const { book, addToBook, updateBookItem, clearBook } = useBook();
  const [guest, setGuest] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (book.length === 0) {
      booking_list.forEach((item) => addToBook(item));
    }
  }, [book.length]);

  const handleBooking = (capacity: number, item: StorageInviteT) => {
    if (Number(guest) === 0) {
      toast.warning("Please enter number of guest attending.");
      return;
    }
    if (item.joined === true) {
      toast.warning("You already have a booking under this date.");
      return;
    }
    if (Number(guest) > capacity) {
      toast.error(`You can only invite up to ${capacity} guests.`);
      return;
    } else {
      updateBookItem(item.id, {
        capacity: capacity - Number(guest),
        joined: true,
      });
      toast.success(
        "You will receive a confirmation email with details of your request.",
      );
      setOpen(null);
    }
  };

  console.log("DATA: ", book);

  return (
    <div className="w-full book-cont grid grid-cols-2 gap-2 my-4">
      {book.map((item, i) => (
        <Dialog
          open={open === item.id ? true : false}
          onOpenChange={(isOpen) => {
            if (isOpen) {
              setOpen(item.id); // Open this dialog
            } else {
              setOpen(null);
            }
          }}
        >
          <DialogTrigger onClick={() => setOpen(item.id)}>
            <Card key={i} className=" hover:bg-primary-gray-500">
              <CardContent className="flex bg-transparent transition ease-in-out gap-2 h-full items-center">
                <div>
                  <MapPin size={40} className="text-primary-brown"></MapPin>
                </div>
                <div>
                  <Label variant="h2" className="text-white">
                    {item.title}
                  </Label>
                  <Label>{item.date}</Label>
                  <Label>{item.time}</Label>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <Label variant="h1">Complete your booking</Label>
                <Label>We look forward to seeing you on the day</Label>
              </DialogTitle>
            </DialogHeader>
            <Card key={i} className=" bg-primary-gray-500">
              <CardContent className="flex bg-transparent transition ease-in-out gap-2 h-full items-center">
                <div>
                  <MapPin size={40} className="text-primary-brown"></MapPin>
                </div>
                <div>
                  <Label variant="h2" className="text-white">
                    {item.title}
                  </Label>
                  <Label>{item.date}</Label>
                  <Label>{item.time}</Label>
                </div>
              </CardContent>
            </Card>
            <div>
              <Input
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                label="How many participants are attending?"
                className="text-center"
                type="number"
              ></Input>
            </div>
            <Button onClick={() => handleBooking(item.capacity, item)}>
              Book Now
            </Button>
            {/* <Button onClick={() => clearBook()}>CLEAR</Button> */}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
