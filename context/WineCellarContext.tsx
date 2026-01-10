"use client";

import { CartItemT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface WineCellarContextType {
  wineCellar: CartItemT[];
  addToWineCellar: (item: CartItemT) => void;
  updateWineCellarItem: (
    id: string | number,
    updates: Partial<CartItemT>
  ) => void;
  removeFromWineCellar: (id: string | number) => void;
  clearWineCellar: () => void;
}

const WineCellarContext = createContext<WineCellarContextType | undefined>(
  undefined
);

export function WineCellarProvider({ children }: { children: React.ReactNode }) {
  const [wineCellar, setWineCellar] = useState<CartItemT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_wine_cellar");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist wine cellar to localStorage
  useEffect(() => {
    localStorage.setItem("my_wine_cellar", JSON.stringify(wineCellar));
  }, [wineCellar]);

  const addToWineCellar = (newItem: CartItemT) => {
    setWineCellar((prev) => {
      const index = prev.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = newItem; // full refresh
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const updateWineCellarItem = (
    id: string | number,
    updates: Partial<CartItemT>
  ) => {
    setWineCellar((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const removeFromWineCellar = (id: string | number) => {
    setWineCellar((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWineCellar = () => {
    setWineCellar([]);
    localStorage.removeItem("my_wine_cellar");
  };

  return (
    <WineCellarContext.Provider
      value={{
        wineCellar,
        addToWineCellar,
        updateWineCellarItem,
        removeFromWineCellar,
        clearWineCellar,
      }}
    >
      {children}
    </WineCellarContext.Provider>
  );
}

export const useWineCellar = () => {
  const context = useContext(WineCellarContext);
  if (!context)
    throw new Error("useWineCellar must be used within a WineCellarProvider");
  return context;
};
