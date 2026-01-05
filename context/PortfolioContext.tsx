"use client";

import { CartItemT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PortfolioContextType {
  portfolio: CartItemT[];
  addToPortfolio: (item: CartItemT) => void;
  removeFromPortfolio: (id: string | number) => void;
  clearPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<CartItemT[]>(() => {
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

  const addToPortfolio = (newItem: CartItemT) => {
    setPortfolio((prev) => {
      const current = Array.isArray(prev) ? prev : [];

      const index = current.findIndex((item) => item.id === newItem.id);

      // ✅ Replace existing item with fresh data
      if (index !== -1) {
        const updated = [...current];
        updated[index] = newItem;
        return updated;
      }

      return [...current, newItem];
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
