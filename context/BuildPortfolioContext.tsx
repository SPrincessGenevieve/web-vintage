"use client";

import { PortfolioBuilder } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PortfolioBuilderContextType {
  portfolio_builder: PortfolioBuilder[];
  addToPortfolioBuilder: (item: PortfolioBuilder) => void;
  updatePortfolioBuilderItem: (
    id: string | number,
    updates: Partial<PortfolioBuilder>,
  ) => void;
  removeFromPortfolioBuilder: (id: string | number) => void;
  clearPortfolioBuilder: () => void;
}

const PortfolioBuilderContext = createContext<
  PortfolioBuilderContextType | undefined
>(undefined);

export function PortfolioBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [portfolio_builder, setPortfolioBuilder] = useState<PortfolioBuilder[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("my_portfolio_builder");
        if (saved) return JSON.parse(saved);
      }
      return [];
    },
  );

  // Persist PortfolioBuilder to localStorage
  useEffect(() => {
    localStorage.setItem(
      "my_portfolio_builder",
      JSON.stringify(portfolio_builder),
    );
  }, [portfolio_builder]);

  const addToPortfolioBuilder = (newItem: PortfolioBuilder) => {
    setPortfolioBuilder((prev) => {
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

  const removeFromPortfolioBuilder = (id: string | number) => {
    setPortfolioBuilder((prev) => prev.filter((item) => item.id !== id));
  };

  const clearPortfolioBuilder = () => {
    setPortfolioBuilder([]);
    localStorage.removeItem("my_portfolio_builder");
  };

  const updatePortfolioBuilderItem = (
    id: string | number,
    updates: Partial<PortfolioBuilder>,
  ) => {
    setPortfolioBuilder((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates, // ✅ only override provided fields
            }
          : item,
      ),
    );
  };

  return (
    <PortfolioBuilderContext.Provider
      value={{
        portfolio_builder,
        addToPortfolioBuilder,
        removeFromPortfolioBuilder,
        clearPortfolioBuilder,
        updatePortfolioBuilderItem,
      }}
    >
      {children}
    </PortfolioBuilderContext.Provider>
  );
}

export const usePortfolioBuilder = () => {
  const context = useContext(PortfolioBuilderContext);
  if (!context)
    throw new Error(
      "usePortfolioBuilder must be used within a PortfolioBuilderProvider",
    );
  return context;
};
