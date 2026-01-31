"use client";

import EntertainmentDialog from "@/components/concierge/EntertainmentDialog";
import SpecialRequestDialog from "@/components/concierge/SpecialRequestDialog";
import SportingEventsDialog from "@/components/concierge/SportingEventsDialog";
import WineEventsDialog from "@/components/concierge/WineEventsDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { concierge_list } from "@/lib/selection";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEventSport } from "@/context/EventSportContext";
import { eventT } from "@/lib/types";
import { useEventWine } from "@/context/EventWineContext";
import { toast } from "sonner";
import { number } from "zod";
import { event_list } from "@/lib/concierge/events";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { truncate } from "fs";

interface ConciergeT {
  title: string;
  desc: string;
  image: string;
  link: string;
}

function useSpringHoverScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);

  const springScroll = (direction: "left" | "right") => {
    if (!ref.current) return;

    const current = ref.current.scrollLeft;
    const target = direction === "right" ? current + 300 : current - 300;

    animate(scrollX, target, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.6,
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.scrollLeft = latest;
        }
      },
    });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, width } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;

    if (x > width - 80) springScroll("right");
    else if (x < 80) springScroll("left");
  };

  return { ref, onMouseMove };
}

export default function Concierge() {
  const { addToEventSport, eventSport, updateEventSport, clearEventSport } =
    useEventSport();
  const router = useRouter();
  const { eventWine, updateEventWine, addToEventWine } = useEventWine();
  const [data, setData] = useState<eventT[]>([]);
  const [dataConcierge, setDataConcierge] = useState<ConciergeT[]>([]);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const topScroll = useSpringHoverScroll();
  const bottomScroll = useSpringHoverScroll();
  const [openID, setOpenID] = useState<number | null>(null);

  useEffect(() => {
    if (data.length === 0) {
      const filteredWine = event_list.filter(
        (item) => item.event_type !== "sports event" && item,
      );
      const filteredSport = event_list.filter(
        (item) => item.event_type === "sports event" && item,
      );
      filteredWine.forEach((item) => addToEventWine(item));
      filteredSport.forEach((item) => addToEventSport(item));
      setData([...filteredSport, ...filteredWine]);
    }
  }, [data.length]);

  useEffect(() => {
    setData([...eventSport, ...eventWine]);
  }, [eventSport, eventWine]);

  useEffect(() => {
    if (dataConcierge.length === 0) {
      setDataConcierge(concierge_list);
    }
  }, [dataConcierge.length]);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleBooking = (id: number, item: eventT) => {
    try {
      if (item.event_type === "sports event") {
        updateEventSport(id, {
          joined: true,
        });
        toast.success("Event has been booked successfully.");
        setOpenID(null);
      } else {
        updateEventWine(id, {
          joined: true,
        });
        toast.success("Event has been booked successfully.");
        setOpenID(null);
        router.refresh();
      }
    } catch (error) {
    } finally {
    }
  };

  const skeletonCount = event_list.length;

  const handleClear = () => {
    setData([]);
  };

  const truncate = (text: string | undefined, max: number = 50): string => {
    if (!text) return ""; // handle undefined
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log("Width changed:", window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full  overflow-y-auto flex flex-col gap-4 justify-between">
      <Label variant="h2">Most Traiding Event </Label>
      <div className="w-full scroll-area h-full flex">
        {data.length === 0 ? (
          <div className="flex justify-start overflow-x-auto overflow-y-hidden gap-2 h-full">
            <div className="w-full flex gap-4">
              {[...Array(skeletonCount)].map((item, index) => (
                <div className="h-full  flex flex-col justify-between">
                  <Skeleton
                    key={index}
                    className="h-100 w-75 bg-primary-gray-400 flex flex-col justify-between"
                  ></Skeleton>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={topScroll.ref}
            onMouseMove={topScroll.onMouseMove}
            className="flex  justify-start overflow-x-auto overflow-y-hidden gap-2 h-full"
          >
            {data.map((item: eventT, index: number) => (
              <Card className="bg-primary-gray-600">
                <CardContent className="max-w-[350px] min-h-[40vh] h-full min-w-[40vh] bg-transparent flex flex-col justify-between">
                  <div>
                    <Image
                      src={item.image}
                      alt=""
                      width={400}
                      height={400}
                      className="object-cover h-35 rounded-2xl"
                    ></Image>
                    <Label variant="h2" className="text-primary-brown">
                      {item.title}
                    </Label>
                    <Label className="text-white">
                      {formatDate(item.start_date)} —{" "}
                      {formatDate(item.end_date)}
                    </Label>
                    <Label className="text-primary-brown">
                      {item.location}
                    </Label>
                    <div className="py-4">
                      <Label
                        className="text-white"
                        variant={width <= 795 ? "p" : "default"}
                      >
                        {truncate(item.description, 200)}
                      </Label>
                    </div>
                  </div>

                  <Dialog
                    open={openID === item.id ? true : false}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) setOpenID(null);
                    }}
                  >
                    <DialogTrigger
                      disabled={item.joined ? true : false}
                      className=""
                    >
                      <Button
                        onClick={() => setOpenID(item.id)}
                        disabled={item.joined ? true : false}
                        className="w-full bg-primary-gray-400 text-white"
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
                          className="w-full h-full  border border-primary-brown/30 rounded-[10px] object-cover object-top"
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
            ))}
          </div>
        )}
      </div>

      <div
        ref={bottomScroll.ref}
        onMouseMove={bottomScroll.onMouseMove}
        className="w-full h-full relative concierge-bottom gap-4 scroll-area overflow-x-auto flex"
      >
        {dataConcierge.length === 0 ? (
          <div className="w-full h-full flex gap-4 justify-between items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-100 min-w-75 w-full bg-primary-gray-400 flex flex-col justify-between"
              />
            ))}
          </div>
        ) : (
          <div className="h-full w-full gap-4 flex justify-between">
            {dataConcierge.map((item, index) => (
              <>
                <Card
                  key={index}
                  className={`card-inner-cont   ${
                    index === 0
                      ? "bg-primary-brown"
                      : index === 1
                        ? "bg-primary-green"
                        : index === 2
                          ? "bg-primary-red-300"
                          : index === 3
                            ? "bg-primary-gray-400"
                            : ""
                  } p-0 border-0 min-w-[40vh] max-w-[45vh]`}
                >
                  <CardContent className="min-h-[40vh]  bg-transparent border border-transparent transition ease-in-out duration-300 hover:border hover:border-primary-brown h-full p-0 flex flex-col justify-between">
                    {/* <DialogTitle></DialogTitle> */}
                    <div className="h-full flex flex-col">
                      <Image
                        src={item.image}
                        width={400}
                        height={400}
                        className="rounded-t-[14px] h-42 object-cover w-full"
                        alt=""
                      ></Image>
                      <div className="p-2">
                        <Label
                          variant="h1"
                          className={`${
                            index === 0 ? "text-black" : "text-primary-brown"
                          }`}
                        >
                          {item.title}
                        </Label>
                        <div>
                          <Label
                            variant={width <= 795 ? "p" : "default"}
                            className={` w-full text-left ${
                              index === 0 ? "text-black" : "text-primary-brown"
                            }`}
                          >
                            {item.desc}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <Button
                        onClick={() => setActiveDialog(item.title)}
                        className={`w-full ${
                          index === 0 &&
                          "bg-primary-gray-400 text-white hover:bg-primary-gray-400/30"
                        }`}
                      >
                        {index === 0
                          ? "Request Wine"
                          : index === 1
                            ? "Browse Event"
                            : index === 2
                              ? "Plan Event"
                              : "Request Wine"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Dialog
                  key={item.title}
                  open={activeDialog === item.title}
                  onOpenChange={(isOpen) =>
                    setActiveDialog(isOpen ? item.title : null)
                  }
                >
                  <DialogContent className="max-h-[90%] overflow-auto">
                    {item.title === "Special Request" ? (
                      <SpecialRequestDialog
                        onClick={() => setActiveDialog(null)}
                      ></SpecialRequestDialog>
                    ) : item.title === "Sporting Events" ? (
                      <SportingEventsDialog></SportingEventsDialog>
                    ) : item.title === "Entertainment" ? (
                      <EntertainmentDialog
                        onClick={() => setActiveDialog(null)}
                      ></EntertainmentDialog>
                    ) : (
                      <WineEventsDialog></WineEventsDialog>
                    )}
                  </DialogContent>
                </Dialog>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
