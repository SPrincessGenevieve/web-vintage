"use client";
import WineCellarDetailBasket from "@/components/cellar/WineCellarDetailBasket";
import WineCellarDetailSingle from "@/components/cellar/WineCellarDetailSingle";
import { useWineCellar } from "@/context/WineCellarContext";
import { portfolio_default } from "@/lib/default_portfolio";
import { CartItemT } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function WineCellarDetail() {
  const params = useParams();
  const id = params.id as string; // {wine}
  const { wineCellar } = useWineCellar();
  const [data, setData] = useState<CartItemT>(portfolio_default[0]);

  useEffect(() => {
    if (!id || !wineCellar?.length) return;

    const matched = wineCellar.find((item) => String(item.id) === id);

    if (matched) {
      setData(matched);
    }
  }, [id, wineCellar]);

  console.log("DATA: ", data);

  return (
    <div className="w-full h-full">
      {data.basket === null ? (
        <WineCellarDetailSingle item={data}></WineCellarDetailSingle>
      ) : (
        <WineCellarDetailBasket></WineCellarDetailBasket>
      )}
    </div>
  );
}
