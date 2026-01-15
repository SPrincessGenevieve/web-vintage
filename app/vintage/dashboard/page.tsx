"use client";

import { AssetsByRegion } from "@/components/dashboard/AssetsByRegion";
import CollectionPL from "@/components/dashboard/CollectionPL";
import DeliveryHistoryTable from "@/components/dashboard/DeliveryHistoryTable";
import TopWines from "@/components/dashboard/TopWines";
import TotalDepositCases from "@/components/dashboard/TotalDepositCases";
import { PortfolioChart } from "@/components/PortfolioChart";


export default function Dashboard() {
  return (
    <div className="flex h-full gap-4 dashboard-main-cont">
      <div className="w-full h-full flex flex-col gap-4">
        <div className="h-[16%] min-h-30">
          <CollectionPL></CollectionPL>
        </div>
        <div className="h-[10%]">
          <TotalDepositCases></TotalDepositCases>
        </div>
        <div className="h-[37%] min-h-70">
          <PortfolioChart></PortfolioChart>
        </div>
        <div className="h-[37%] min-h-70">
          <AssetsByRegion></AssetsByRegion>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="h-[63%]">
          <TopWines></TopWines>
        </div>
        <div className="h-[37%] min-h-70">
          <DeliveryHistoryTable></DeliveryHistoryTable>
        </div>
      </div>
    </div>
  );
}
