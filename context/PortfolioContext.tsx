"use client";

import { PortfolioDataT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PortfolioContextType {
  portfolio: PortfolioDataT[];
  addToPortfolio: (item: PortfolioDataT) => void;
  removeFromPortfolio: (id: string | number) => void;
  clearPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioDataT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_portfolio");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist portfolio to localStorage
  useEffect(() => {
    localStorage.setItem("my_portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (newItem: PortfolioDataT) => {
    setPortfolio((prev) => {
      const exists = prev.find((item) => item.id === newItem.id);
      if (exists) return prev; // avoid duplicates
      return [...prev, newItem];
    });
  };

  const removeFromPortfolio = (id: string | number) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
  };

  const clearPortfolio = () => {
    setPortfolio([]);
    localStorage.removeItem("my_portfolio");
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, addToPortfolio, removeFromPortfolio, clearPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context)
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
};
