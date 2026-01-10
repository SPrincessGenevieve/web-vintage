"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Input } from "../ui/input";

const region_list = [
  { id: "bordeaux", name: "Bordeaux" },
  { id: "burgundy", name: "Burgundy" },
  { id: "champange", name: "Champagne" },
  { id: "rhone", name: "Rhône" },
  { id: "italy", name: "Italy" },
  { id: "california", name: "California" },
];

const wine_list = [
  { id: "merlot", name: "Merlot" },
  { id: "cabernet_sauvignon", name: "Cabernet Sauvignon" },
  { id: "pinot_noir", name: "Pinot Noir" },
  { id: "sangiovese", name: "Sangiovese" },
  { id: "nebbiolo", name: "Nebbiolo" },
  { id: "chardonnay", name: "Chardonnay" },
  { id: "sauvignon blanc", name: "Sauvignon Blanc" },
  { id: "champagne", name: "Champagne" },
  { id: "prosecco", name: "Prosecco" },
];

const vintagesList = [
  { id: "1995_2000", name: "1995-2000" },
  { id: "2001_2005", name: "2001-2005" },
  { id: "2006_2010", name: "2006-2010" },
  { id: "2011_2015", name: "2011-2015" },
  { id: "2016_2020", name: "2016-2020" },
  { id: "2021_2025", name: "2021-2025" },
];

export default function Tailor({ onClick }: { onClick: () => void }) {
  const [regions, setRegions] = useState<string[]>([]);
  const [wine, setWine] = useState<string[]>([]);
  const [vintage, setVintage] = useState<string[]>([]);

  const toggleRegion = (name: string) => {
    setRegions(
      (prev) =>
        prev.includes(name)
          ? prev.filter((r) => r !== name) // remove
          : [...prev, name] // add
    );
  };

  const toggleWine = (name: string) => {
    setWine(
      (prev) =>
        prev.includes(name)
          ? prev.filter((r) => r !== name) // remove
          : [...prev, name] // add
    );
  };

  const toggleVintage = (name: string) => {
    setVintage(
      (prev) =>
        prev.includes(name)
          ? prev.filter((r) => r !== name) // remove
          : [...prev, name] // add
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label variant="h1">Investment Preferences</Label>
        <Label>Tailor your wine selection</Label>
      </div>
      <div className="flex flex-col gap-2">
        <Label variant="h2" className="text-white">
          Preferred Regions
        </Label>
        <div className="flex flex-wrap gap-2">
          {region_list.map((item) => {
            const isSelected = regions.includes(item.name);

            return (
              <Button
                key={item.name}
                onClick={() => toggleRegion(item.name)}
                variant={isSelected ? "default" : "outline"}
                className="rounded-full border border-primary-brown"
              >
                {item.name}
              </Button>
            );
          })}
        </div>
        <Label className="italic">
          Select multiple regions or leave blank for expert selection
        </Label>
      </div>

      <div className="flex flex-col gap-2">
        <Label variant="h2" className="text-white">
          Preferred Wines / Varietals
        </Label>
        <div className="flex gap-2 flex-wrap">
          {wine_list.map((item) => {
            const isSelected = wine.includes(item.name);

            return (
              <Button
                key={item.name}
                onClick={() => toggleWine(item.name)}
                variant={isSelected ? "default" : "outline"}
                className="rounded-full border border-primary-brown"
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label variant="h2" className="text-white">
          Preferred Vintages
        </Label>
        <div className="flex gap-2 flex-wrap">
          {vintagesList.map((item) => {
            const isSelected = vintage.includes(item.name);

            return (
              <Button
                key={item.name}
                onClick={() => toggleVintage(item.name)}
                variant={isSelected ? "default" : "outline"}
                className="rounded-full border-primary-brown"
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label variant="h2" className="text-white">
          Investment Size / Budget
        </Label>
        <Input
        type="number"
          className="text-white"
          placeholder="Type your investment size"
        ></Input>
        <Label className="italic">
          This helps us tailor recommendations to your investment goals
        </Label>
      </div>

      <div className="flex flex-col gap-2">
        <Label variant="h2" className="text-white">
          Special Requests
        </Label>
        <Textarea
          className="text-white"
          placeholder="Any specific prioties should we know about?"
        ></Textarea>
      </div>
      <Button onClick={onClick}>Submit Preferences</Button>
    </div>
  );
}
