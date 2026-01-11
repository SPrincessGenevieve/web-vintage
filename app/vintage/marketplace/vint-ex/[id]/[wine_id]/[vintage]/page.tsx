"use client";

import DetailsCard from "@/components/marketplace/DetailsCard";
import TabDeatils from "@/components/marketplace/TabDetails";
import DrawerVintage from "@/components/marketplace/vintex/DrawerVintage";
import TableVintageDetail from "@/components/marketplace/vintex/TableVintageDetail";
import VintageTable from "@/components/marketplace/vintex/VintageTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { ChevronLeft, Wine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Vintage() {
  const router = useRouter();
  const tabs = ["Performance", "Overview", "Tasting Note"];

  return (
    <div className="w-full h-full"> 
      <TableVintageDetail></TableVintageDetail>
    </div>
  );
}
