"use client";
import { useState, useEffect } from "react";
import CardWine from "@/components/marketplace/CardWine";
import { Button } from "@/components/ui/button";
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
import { ChartPie, Funnel, SortAsc, SortDesc, X } from "lucide-react";
import React from "react";
import { special_volume } from "@/lib/wine_data/special_volumes";
import { special_bundle } from "@/lib/wine_data/special_bundle";
import { rare as rare_data } from "@/lib/wine_data/rare";
import { useUserContext } from "@/context/UserContext";
import { useRare } from "@/context/RareContext";
import CardWineBundle from "@/components/marketplace/CardWineRare";
import CardWineRare from "@/components/marketplace/CardWineRare";

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
type CardType = "vint-ex" | "special-volumes" | "special-bundle" | "rare";

export default function Marketplace() {
  const { filter_market, setUserDetails } = useUserContext();
  const { rare, addToRare } = useRare();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<CardType>("vint-ex");

  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const handleClearFilter = (type: string) => {
    if (type === "category") {
      setSelectedCategory("vint-ex");
    } else {
      setSelectedFilter("all");
    }
  };

  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  useEffect(() => {
    rare_data.forEach((item) => addToRare(item));
  }, [rare.length]);

  useEffect(() => {
    setSortOrder("none");
  }, [selectedCategory]);

  useEffect(() => {
    setCount(
      (selectedFilter !== "all" ? 1 : 0) +
        (selectedCategory !== "vint-ex" ? 1 : 0)
    );
  }, [selectedCategory, selectedFilter]);

  const currentData = React.useMemo(() => {
    const source =
      selectedCategory === "vint-ex"
        ? vintex
        : selectedCategory === "special-volumes"
        ? special_volume
        : selectedCategory === "special-bundle"
        ? special_bundle
        : rare;

    const filtered = source.filter((wine: any) => {
      const wineData = wine.wine_vintage_details || wine;
      const wineName = wineData.name || "";

      const rawRegion =
        wine.fromm || wine.wine_parent?.fromm || wineData.fromm || "";

      const wineRegionLower = rawRegion.toLowerCase().trim();
      const filterValueLower = selectedFilter.toLowerCase().trim();

      const matchesSearch = wineName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRegion =
        selectedFilter === "all" || wineRegionLower === filterValueLower;

      return matchesSearch && matchesRegion;
    });

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

  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("none");
  };

  console.log("WINE: ", currentData);

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
                    setSelectedCategory(item.value as CardType);
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
          <Label className="text-black text-[12px]">
            <ChartPie></ChartPie>Build Portfolio
          </Label>
        </Button>
      </div>
      <div className="flex gap-2">
        {selectedCategory !== "vint-ex" && (
          <div className="flex">
            <Label className="bg-primary-brown justify-between capitalize px-2 py-1 font-semibold text-black rounded-[5px]">
              {selectedCategory === "rare"
                ? "Trending Wines"
                : selectedCategory}
              <Button
                onClick={() => handleClearFilter("category")}
                variant={"ghost"}
                className="w-4 h-5 text-black"
              >
                <X></X>
              </Button>
            </Label>
          </div>
        )}
        {selectedFilter !== "all" && (
          <div className="flex">
            <Label className="bg-primary-brown flex justify-between capitalize px-2 font-semibold text-black rounded-[5px]">
              {selectedFilter}
              <Button
                onClick={() => handleClearFilter("filter")}
                variant={"ghost"}
                className="w-4 h-5 text-black"
              >
                <X></X>
              </Button>
            </Label>
          </div>
        )}
      </div>
      {selectedCategory === "rare" ? (
        <CardWineRare item={currentData} type={selectedCategory}></CardWineRare>
      ) : (
        <CardWine item={currentData} type={selectedCategory} />
      )}
    </div>
  );
}
