"use client";
import { WineImage } from "@/components/marketplace/WineImage";
import AddToMyInvestment from "@/components/AddToMyInvestment";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePortfolio } from "@/context/PortfolioContext";
import { portfolio_default } from "@/lib/default_portfolio";
import {
  ArrowUpDown,
  Dot,
  Download,
  Funnel,
  ListRestart,
  TableCellsMerge,
  Trash,
  Wine,
  WineOff,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { uuidv4 } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { useSubAccount } from "@/context/SubAccountContext";
import { default_sub_account } from "@/lib/default_sub_account";
import AddSubAccount from "@/components/settings/sub-account/AddSubAccount";

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

const sort = [
  {
    value: "best",
    label: "Best Performing",
  },
  {
    value: "worst",
    label: "Worst Performing",
  },
  {
    value: "high",
    label: "Price high to low",
  },
  {
    value: "low",
    label: "Price low to high",
  },
  {
    value: "short",
    label: "Shortest Investment",
  },
  {
    value: "long",
    label: "Longest Investment",
  },
];

const header_list = [
  "Investment",
  "Qty",
  "Purchase",
  "Value",
  "P&L",
  "Holding",
  "Status",
];

export default function Portfolio() {
  const { portfolio, clearPortfolio, addToPortfolio } = usePortfolio();
  const { subAccounts, addSubAccount } = useSubAccount();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const activeSubAccount = subAccounts.find((s) => s.is_active);

  const filteredPortfolio = React.useMemo(() => {
    if (!activeSubAccount) return [];
    return portfolio.filter(
      (item) => item.sub_account.id === activeSubAccount.id
    );
  }, [portfolio, activeSubAccount]);

  useEffect(() => {
    if (subAccounts.length === 0) {
      default_sub_account.forEach((item) => addSubAccount(item));
    }
  }, [subAccounts.length]);

  console.log("PORFOLIO FILTERED: ", filteredPortfolio);

  const vintage_list = Array.from(
    new Set(
      filteredPortfolio
        .filter((item) => item?.vintage && item.vintage !== 0)
        .map((item) => item.vintage)
    )
  );

  const region_list = Array.from(
    new Set(
      filteredPortfolio.filter((item) => item?.fromm).map((item) => item.fromm)
    )
  );
  const [selectedVintage, setSelectedVintage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [loadingID, setLoadingID] = useState("");

  const handleDel = () => {
    clearPortfolio();
  };

  const generateProfitLoss = (id: string, purchasePrice: number) => {
    const KEY = `pl_${id}`;
    const now = Date.now();
    const DAY = 1000 * 60 * 60 * 24;

    const cached = localStorage.getItem(KEY);

    if (cached) {
      const data = JSON.parse(cached);

      // keep value if less than 24 hours old
      if (now - data.timestamp < DAY) {
        return data.value;
      }
    }

    // generate new values
    const percentage = Number((Math.random() * 40 - 15).toFixed(2));
    const value = Number(((purchasePrice * percentage) / 100).toFixed(2));

    const result = {
      profit_loss_value: value,
      profit_loss_percent: percentage,
    };

    localStorage.setItem(
      KEY,
      JSON.stringify({ value: result, timestamp: now })
    );

    return result;
  };

  const [countFilter, setCountFilter] = useState(0);

  useEffect(() => {
    if (selectedRegion !== "" && selectedVintage === 0) {
      setCountFilter(1);
    } else if (selectedRegion === "" && selectedVintage !== 0) {
      setCountFilter(1);
    } else if (selectedRegion !== "" && selectedVintage !== 0) {
      setCountFilter(2);
    } else {
      setCountFilter(0);
    }
  });

  const clearFilter = () => {
    setSelectedRegion("");
    setSelectedSort("");
    setSelectedVintage(0);
  };

  const handleDetail = (id: string) => {
    setLoadingID(id);
    console.log(`/vintage/portfolio/${id}`);
    router.push(`/vintage/portfolio/${id}`);
  };

  const getMarketValue = (item: any) => {
    return item.basket !== null
      ? item.basket.market_value
      : item.stock_wine_vintage?.market_value ?? 0;
  };

  const displayPortfolio = React.useMemo(() => {
    let data = [...filteredPortfolio];

    /** SEARCH */
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      data = data.filter((item) =>
        item.wine_name.toLowerCase().includes(keyword)
      );
    }

    /** FILTER — VINTAGE */
    if (selectedVintage !== 0) {
      data = data.filter((item) => item.vintage === selectedVintage);
    }

    /** FILTER — REGION */
    if (selectedRegion !== "") {
      data = data.filter((item) => item.fromm === selectedRegion);
    }

    /** SORT */
    if (selectedSort !== "") {
      data.sort((a, b) => {
        const plA = generateProfitLoss(
          String(a.id),
          a.purchase_price
        ).profit_loss_value;
        const plB = generateProfitLoss(
          String(b.id),
          b.purchase_price
        ).profit_loss_value;

        const mvA = getMarketValue(a);
        const mvB = getMarketValue(b);

        switch (selectedSort) {
          case "best":
            return plB - plA; // highest profit first

          case "worst":
            return plA - plB; // lowest profit first

          case "high":
            return mvB - mvA; // price high → low

          case "low":
            return mvA - mvB; // price low → high

          case "short":
            return a.purchase_price - b.purchase_price;

          case "long":
            return b.purchase_price - a.purchase_price;

          default:
            return 0;
        }
      });
    }

    return data;
  }, [
    filteredPortfolio,
    search,
    selectedVintage,
    selectedRegion,
    selectedSort,
  ]);

  useEffect(() => {
    if (portfolio.length === 0) {
      portfolio_default.forEach((item) => addToPortfolio(item));
    }
  }, [portfolio.length]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <Button onClick={handleDel}>Delete</Button>
      <div className="w-full flex gap-4 items-center justify-center">
        <Input
          placeholder="Search by wine name"
          className="bg-primary-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <Button variant={"outline"} className="mt-2">
          <Download></Download> Excel
        </Button>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              {selectedSort !== "" && (
                <div className="absolute flex items-center justify-center w-4 h-4 bg-[#ff8c00bc] rounded-full -top-1 left-0">
                  <Label className="text-white text-[10px] font-bold">1</Label>
                </div>
              )}
              <Button variant={"outline"}>
                <ArrowUpDown size={20} /> Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-primary-brown">
                Sort by
              </DropdownMenuLabel>
              {sort.map((item, index) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => setSelectedSort(item.value)}
                  checked={item.value === selectedSort}
                  key={index}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              {countFilter > 0 && (
                <div className="absolute flex items-center justify-center w-4 h-4 bg-[#ff8c00bc] rounded-full -top-1 left-0">
                  <Label className="text-white text-[10px] font-bold">
                    {countFilter}
                  </Label>
                </div>
              )}
              <Button variant={"outline"}>
                <Funnel size={20} /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-primary-brown">
                Filter by Vintage
              </DropdownMenuLabel>
              {vintage_list.map((item, index) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => setSelectedVintage(item ?? 0)}
                  checked={item === selectedVintage}
                  key={index}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator className="bg-primary-brown/30"></DropdownMenuSeparator>
              <DropdownMenuLabel className="text-primary-brown">
                Filter by Region
              </DropdownMenuLabel>
              {region_list.map((item, index) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => setSelectedRegion(item ?? "")}
                  checked={item === selectedRegion}
                  key={index}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {(countFilter > 0 || selectedSort !== "") && (
            <Button variant="outline" onClick={clearFilter}>
              <ListRestart />
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <AddToMyInvestment></AddToMyInvestment>
        </div>
      </div>
      <Card className={`overflow-y-auto relative gap-0 h-[90%]`}>
        {filteredPortfolio.length === 0 ? (
          <div className="w-full h-full flex-col flex items-center justify-center gap-4">
            <Trash className="text-primary-brown" size={40}></Trash>
            <Label variant="h1" className="text-[18px]">
              Your Wine Cellar is empty
            </Label>
            <Button onClick={() => router.push("/vintage/marketplace")}>
              <Wine></Wine>
              Shop Marketplace
            </Button>
          </div>
        ) : (
          <CardContent className="flex h-full flex-col min-w-400">
            <Table className="rounded-2xl">
              <TableHeader>
                <TableRow className="border-primary-brown/30">
                  {header_list.map((item) => (
                    <TableCell className="text-white/30">
                      <div className="w-full flex items-center justify-center">
                        <Label className="">{item}</Label>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="w-full rounded-2xl">
                {displayPortfolio.map((item, index) => {
                  const id = String(item.id);
                  const { profit_loss_value, profit_loss_percent } =
                    generateProfitLoss(id, item.purchase_price);
                  const market_val =
                    item.basket !== null
                      ? item.basket.market_value
                      : item.stock_wine_vintage?.market_value;

                  const bottle = item.bottle_size;

                  return (
                    <TableRow
                      onClick={() => handleDetail(String(item.id))}
                      className="border-primary-brown/30 rounded-2xl relative"
                    >
                      <TableCell className="max-w-[300px]">
                        {loadingID === item.id && (
                          <div className="absolute bg-primary-gray-500/30 w-[99%] h-30 flex items-center justify-center">
                            <Spinner className="h-10 w-10 text-primary-brown"></Spinner>
                          </div>
                        )}
                        <div className="flex gap-4">
                          <Image
                            alt=""
                            width={400}
                            height={400}
                            className="rounded-2xl w-40 h-30 object-contain"
                            src={
                              Array.isArray(item.images)
                                ? item.images[0]
                                : item.images
                            }
                          />
                          <div className="flex flex-col justify-center">
                            <Label variant="h2" className="text-primary-brown">
                              {item.wine_name}
                            </Label>
                            <div className="flex items-center">
                              <Label>{item.fromm}</Label>
                              {item.basket === null && (
                                <>
                                  <Dot className="text-white"></Dot>
                                  <Label>{item?.vintage}</Label>
                                </>
                              )}
                              <Dot className="text-white"></Dot>
                              <Label>
                                {item.case_size}x
                                {bottle === "0750"
                                  ? 75
                                  : bottle === "1500"
                                  ? 150
                                  : bottle === "3000"
                                  ? 300
                                  : bottle === "6000"
                                  ? 600
                                  : 0}
                                cl
                              </Label>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <Label className="text-white">{item.quantity}</Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <Label className="text-white">
                            £{" "}
                            {Number(
                              item.purchase_price.toFixed(2)
                            ).toLocaleString()}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <Label className="text-white">
                            £ {market_val?.toLocaleString()}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full gap-2 flex flex-col items-center justify-center">
                          <Label
                            className={`${
                              profit_loss_value > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            £{" "}
                            {Number(
                              profit_loss_value.toFixed()
                            ).toLocaleString()}
                          </Label>
                          <Label
                            className={`text-white px-2 py-1 rounded-[5px] ${
                              profit_loss_value > 0
                                ? "bg-green-500/30"
                                : "bg-red-500/30"
                            }`}
                          >
                            {profit_loss_percent}%
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <Label className="text-white">
                            {item.holding_year} Year/s
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <Label
                            className={`rounded-[5px] px-2 py-0.5 font-semibold ${
                              item.status === "Buy Request"
                                ? "bg-primary-brown text-black"
                                : item.status === "Awaiting Arrival"
                                ? "bg-red-900  text-white"
                                : item.status === "Gift Request"
                                ? "bg-pink-800  text-white"
                                : "text-white bg-[#8A6B47]"
                            }`}
                          >
                            {item.status}
                          </Label>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
