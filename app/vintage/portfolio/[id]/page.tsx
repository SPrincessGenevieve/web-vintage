"use client";
import PortfolioDetailBasket from "@/components/portfolio/PortfolioDetailBasket";
import PortfolioDetailSingle from "@/components/portfolio/PortfolioDetailSingle";
import { usePortfolio } from "@/context/PortfolioContext";
import { portfolio_default } from "@/lib/default_portfolio";
import { CartItemT } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PortfolioDetail() {
  const params = useParams();
  const id = params.id as string; // {wine}
  const { portfolio } = usePortfolio();
  const [data, setData] = useState<CartItemT>(portfolio_default[0]);

  useEffect(() => {
    if (!id || !portfolio?.length) return;

    const matched = portfolio.find((item) => String(item.id) === id);

    if (matched) {
      setData(matched);
    }
  }, [id, portfolio]);

  console.log("DATA: ", data);

  return (
    <div className="w-full h-full">
      {data.basket === null ? (
        <PortfolioDetailSingle item={data}></PortfolioDetailSingle>
      ) : (
        <PortfolioDetailBasket item={data}></PortfolioDetailBasket>
      )}
    </div>
  );
}
