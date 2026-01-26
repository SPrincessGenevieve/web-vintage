"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { event_list } from "@/lib/concierge/events";
import { eventT } from "@/lib/types";
import { event_default } from "@/lib/concierge/default_concierge";
import { useEventWine } from "@/context/EventWineContext";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";

export default function WineEventsDialog() {
  const [data, setData] = useState<eventT[]>([]);
  const [openID, setOpenID] = useState<number | null>(null);
  const { addToEventWine, eventWine, updateEventWine, clearEventWine } =
    useEventWine();

  useEffect(() => {
    const filteredData = event_list.filter(
      (item) => item.event_type !== "sports event" && item,
    );
    setData(filteredData);
    // ;
    if (eventWine.length === 0) {
      filteredData.forEach((item) => addToEventWine(item));
    }
  }, [eventWine.length]);

  const handleBooking = (id: number, item: eventT) => {
    if (item.joined === true) {
      toast.warning("Event has already been booked.");
    } else {
      updateEventWine(id, {
        joined: true,
      });
      toast.success("Event has been booked successfully.");
      setOpenID(null);
    }
  };

  const handleClear = () => {
    clearEventWine();
  };

  return (
    <div>
      {/* <Button onClick={handleClear}>CLEAR</Button> */}
      <div className="flex flex-col gap-4">
        {eventWine.map((item, index) => {
          const formatDate = (dateStr: string) =>
            new Date(dateStr).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

          const formattedStart = formatDate(item.start_date);
          const formattedEnd = formatDate(item.end_date);

          return (
            <Card key={index} className="bg-primary-gray-500">
              <CardContent className="flex flex-col gap-4 bg-transparent p-4">
                <Image
                  src={item.image}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full border border-primary-brown/30 rounded-[10px] h-full max-h-52 object-cover object-top"
                ></Image>
                <CardTitle>
                  <Label variant="h2" className="text-white">
                    {item.title}
                  </Label>
                </CardTitle>
                <div className="flex flex-col gap-4">
                  <Label>{item.description}</Label>
                  <div>
                    <Label>
                      {formattedStart} - {formattedEnd}
                    </Label>
                    <Label>{item.location}</Label>
                    <Label>{item.guest} guests maximum</Label>
                    <div className="mt-4">
                      <Label className="text-white font-medium">
                        Event Highlights
                      </Label>
                      {item.event_highlights.map((item2, index2) => (
                        <div key={index2} className="flex gap-2">
                          <div>
                            <Dot className="text-primary-brown"></Dot>
                          </div>
                          <div>
                            <Label>{item2.highlights}</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Dialog
                  open={openID === item.id ? true : false}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) setOpenID(null);
                  }}
                >
                  <DialogTrigger>
                    <Button
                      className="w-full"
                      disabled={item.joined ? true : false}
                      onClick={() => setOpenID(item.id)}
                    >
                      {item.joined ? "Reserved" : "Reserve your place"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        <Label>Confirm Reservation</Label>
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      <Image
                        src={item.image}
                        alt=""
                        width={400}
                        height={400}
                        className="w-full h-full max-h-50  border border-primary-brown/30 rounded-[10px] object-cover object-top"
                      ></Image>
                    </div>
                    <div>
                      <Label variant="h2" className="text-white">
                        {item.title}
                      </Label>
                      <Label>{item.location}</Label>
                    </div>
                    <DialogFooter>
                      <Button
                        variant={"outline"}
                        onClick={() => setOpenID(null)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleBooking(item.id, item)}>
                        Confirm Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
