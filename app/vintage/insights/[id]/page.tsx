"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ingihts_list } from "@/lib/insights/insights";
import { InsightsBodyT, InsightsT } from "@/lib/types";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  ChevronLeft,
  Dot,
  Facebook,
  Instagram,
  LinkIcon,
  Share,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function InsightsRenderer({ data }: { data: InsightsBodyT }) {
  switch (data.type) {
    case "list":
      return (
        <div className="ml-4 mb-4">
          {data.items?.map((item, index) => (
            <div className="flex items-center">
              <div className="w-5">
                <Dot className="text-white"></Dot>
              </div>
              <div>
                <Label>{item.replace(/\*\*/g, "")}</Label>
              </div>
            </div>
          ))}
        </div>
      );

    case "paragraph":
      return (
        <div className="py-2">
          {data?.content?.includes("**") ? (
            <Label className="mt-4" variant="h2">
              {data?.content?.replace(/\*\*/g, "")}
            </Label>
          ) : (
            <Label className="">{data?.content?.replace(/\*\*/g, "")}</Label>
          )}
        </div>
      );

    case "image":
      return (
        <div className="w-full flex flex-col">
          <Image
            src={data?.url ?? ""}
            className="w-full rounded-2xl h-auto my-4"
            alt=""
            width={900}
            height={900}
          ></Image>
          <Label className="mb-4 text-white" variant="h2">
            {data?.caption}
          </Label>
        </div>
      );
  }
}

export default function InsightDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // {wine}
  const [data, setData] = useState<InsightsT[]>([]);

  const list = [
    {
      link: "http://localhost:3000/vintage/insights/1",
      icon: LinkIcon,
    },
    {
      link: "",
      icon: Twitter,
    },
    {
      link: "",
      icon: Instagram,
    },
    {
      link: "",
      icon: Facebook,
    },
  ];

  useEffect(() => {
    if (data.length === 0) {
      const filtered = ingihts_list.filter((item) => item.id === Number(id));
      setData(filtered);
    }
  }, [data.length]);

  console.log("DATA INSIGHTS: ", data);
  const item: InsightsT = data[0];

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied")
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-center">
        <Button onClick={() => router.back()} variant={"ghost"}>
          <ChevronLeft></ChevronLeft>Back
        </Button>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-4">
          {list.map((item, index) => (
            <Button
              onClick={() => item.icon === LinkIcon && handleCopy(item.link)}
              variant={"outline"}
              className="rounded-full h-10 hover:bg-primary-brown/30 transition ease-in-out"
            >
              <item.icon></item.icon>
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-4 px-4 w-full max-w-[100vh]">
          <div className="mb-8">
            <Label className="text-primary-brown" variant="h1">
              {item?.title}
            </Label>
            <Label>{item?.description}</Label>
            <Label>Vintage Associates</Label>
          </div>
          <div>
            <Image
              src={item?.image_header}
              alt=""
              width={900}
              height={900}
              className="w-full h-full min-h-55 rounded-2xl object-cover"
            ></Image>
          </div>

          <div>
            {item?.body.map((item, index) => (
              <div className="">
                <InsightsRenderer key={index} data={item}></InsightsRenderer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
