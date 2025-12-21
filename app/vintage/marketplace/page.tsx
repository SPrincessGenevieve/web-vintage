"use client";
import { useState, useEffect } from "react";
import CardWine from "@/components/marketplace/CardWine";
import { WineImage } from "@/components/marketplace/WineImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vintex } from "@/lib/wine_data/vintex";
import {
  ChartPie,
  Funnel,
  FunnelPlus,
  FunnelX,
  SortAsc,
  SortDesc,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { special_volume } from "@/lib/wine_data/special_volumes";
import { special_bundle } from "@/lib/wine_data/special_bundle";
import { rare } from "@/lib/wine_data/rare";
import { useUserContext } from "@/context/UserContext";

const filter = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Bordeaux",
    value: "bordeaux",
  },
  {
    label: "Burgundy",
    value: "burgundy",
  },
  {
    label: "Champagne",
    value: "champagne",
  },
  {
    label: "Italy",
    value: "italy",
  },
  {
    label: "California",
    value: "california",
  },
];

const category = [
  {
    label: "Vint-ex",
    value: "vint-ex",
  },
  {
    label: "Special Volumes",
    value: "special-volumes",
  },
  {
    label: "Special Bundle",
    value: "special-bundle",
  },
  {
    label: "Trending Wines",
    value: "rare",
  },
];

const sort = [{}];

export default function Marketplace() {
  const { filter_market, setUserDetails } = useUserContext();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(filter_market);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  // 1. New Sort State: "none", "asc", or "desc"
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  // 2. Clear sort when category changes
  useEffect(() => {
    setSortOrder("none");
  }, [selectedCategory]);

  // Update filter count logic
  useEffect(() => {
    setCount(
      (selectedFilter !== "all" ? 1 : 0) +
        (selectedCategory !== "vint-ex" ? 1 : 0)
    );
  }, [selectedCategory, selectedFilter]);

  const currentData = React.useMemo(() => {
    // 1. Pick the data source (same as before)
    const source =
      selectedCategory === "vint-ex"
        ? vintex
        : selectedCategory === "special-volumes"
        ? special_volume
        : selectedCategory === "special-bundle"
        ? special_bundle
        : rare;

    // 2. Filter the source
    const filtered = source.filter((wine: any) => {
      const wineData = wine.wine_vintage_details || wine;
      const wineName = wineData.name || "";

      // SAFE REGION EXTRACTION
      // We check three places for the region and default to "" if not found
      const rawRegion =
        wine.fromm || wine.wine_parent?.fromm || wineData.fromm || "";

      // NORMALIZATION
      // Turn both the data and the filter to lowercase so they match
      const wineRegionLower = rawRegion.toLowerCase().trim();
      const filterValueLower = selectedFilter.toLowerCase().trim();

      const matchesSearch = wineName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRegion =
        selectedFilter === "all" || wineRegionLower === filterValueLower;

      return matchesSearch && matchesRegion;
    });

    // 3. Sort (A-Z logic remains the same)
    if (sortOrder === "none") return filtered;
    return [...filtered].sort((a: any, b: any) => {
      const nameA = (
        a.wine_vintage_details?.name ||
        a.name ||
        ""
      ).toLowerCase();
      const nameB = (
        b.wine_vintage_details?.name ||
        b.name ||
        ""
      ).toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [search, selectedCategory, selectedFilter, sortOrder]);

  // Helper to cycle through sort states: none -> A-Z -> Z-A -> none
  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("none");
  };

  return (
    <div className={`flex flex-col gap-4 h-full`}>
      <Input
        placeholder="Search by wine name"
        className="bg-primary-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              {count > 0 && (
                <div className="absolute flex items-center justify-center w-4 h-4 bg-[#ff8c00bc] rounded-full top-1 left-1">
                  <Label className="text-white text-[10px] font-bold">
                    {count}
                  </Label>
                </div>
              )}
              <Button variant={"outline"}>
                <Funnel size={20} /> Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-primary-brown">
                Category
              </DropdownMenuLabel>
              {category.map((item, index) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => {
                    setSelectedCategory(item.value);
                    setUserDetails({ filter_market: item.value });
                  }}
                  checked={item.value === selectedCategory}
                  key={index}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator className="bg-primary-brown/30"></DropdownMenuSeparator>
              <DropdownMenuLabel className="text-primary-brown">
                Region
              </DropdownMenuLabel>
              {filter.map((item, index) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => setSelectedFilter(item.value)}
                  checked={item.value === selectedFilter}
                  key={index}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={sortOrder === "none" ? "outline" : "default"}
            onClick={toggleSort}
            className="w-auto"
          >
            {sortOrder === "none" && (
              <>
                <Funnel size={18} className="mr-2" /> Sort
              </>
            )}
            {sortOrder === "asc" && (
              <>
                <SortAsc size={18} className="mr-2" /> A to Z
              </>
            )}
            {sortOrder === "desc" && (
              <>
                <SortDesc size={18} className="mr-2" /> Z to A
              </>
            )}
          </Button>
        </div>
        <Button>
          <Label className="text-white text-[12px]">
            <ChartPie></ChartPie>Build Portfolio
          </Label>
        </Button>
      </div>
      <CardWine item={currentData} type={selectedCategory} />
    </div>
  );
}
