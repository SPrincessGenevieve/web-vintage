"use client";

import { RareCardT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface RareContextType {
  rare: RareCardT[];
  addToRare: (item: RareCardT) => void;
  updateRareItem: (id: string | number, updates: Partial<RareCardT>) => void;
  removeFromRare: (id: string | number) => void;
  clearRare: () => void;
}

const RareContext = createContext<RareContextType | undefined>(undefined);

export function RareProvider({ children }: { children: React.ReactNode }) {
  const [rare, setRare] = useState<RareCardT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_rare");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist Rare to localStorage
  useEffect(() => {
    localStorage.setItem("my_rare", JSON.stringify(rare));
  }, [rare]);

  const addToRare = (newItem: RareCardT) => {
    setRare((prev) => {
      const current = Array.isArray(prev) ? prev : [];

      const index = current.findIndex((item) => item.investment_id === newItem.investment_id);

      // ✅ Replace existing item with fresh data
      if (index !== -1) {
        const updated = [...current];
        updated[index] = newItem;
        return updated;
      }

      return [...current, newItem];
    });
  };

  const removeFromRare = (id: string | number) => {
    setRare((prev) => prev.filter((item) => item.investment_id !== id));
  };

  const clearRare = () => {
    setRare([]);
    localStorage.removeItem("my_rare");
  };

  const updateRareItem = (id: string | number, updates: Partial<RareCardT>) => {
    setRare((prev) =>
      prev.map((item) =>
        item.investment_id === id
          ? {
              ...item,
              ...updates, // ✅ only override provided fields
            }
          : item
      )
    );
  };

  return (
    <RareContext.Provider
      value={{
        rare,
        addToRare,
        removeFromRare,
        clearRare,
        updateRareItem,
      }}
    >
      {children}
    </RareContext.Provider>
  );
}

export const useRare = () => {
  const context = useContext(RareContext);
  if (!context) throw new Error("useRare must be used within a RareProvider");
  return context;
};
