"use client";

import { CartItemT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartSummaryContextType {
  cart_summary: CartItemT[];
  addToCartSummary: (item: CartItemT) => void;
  removeFromCartSummary: (id: string | number) => void;
  clearCartSummary: () => void;
}

const CartSummaryContext = createContext<CartSummaryContextType | undefined>(
  undefined
);

export function CartSummaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart_summary, setCartSummary] = useState<CartItemT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_cart_summary");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("my_cart_summary", JSON.stringify(cart_summary));
  }, [cart_summary]);

  const addToCartSummary = (newItem: CartItemT) => {
    setCartSummary((prev) => {
      const current = Array.isArray(prev) ? prev : []; // <-- ensure it's always an array
      const exists = current.find((item) => item.id === newItem.id);
      if (exists) return current; // avoid duplicates
      return [...current, newItem];
    });
  };

  const removeFromCartSummary = (id: string | number) => {
    setCartSummary((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.filter((item) => item.id !== id);
    });
  };

  const clearCartSummary = () => {
    setCartSummary([]);
    localStorage.removeItem("my_cart_summary");
  };

  return (
    <CartSummaryContext.Provider
      value={{
        cart_summary,
        addToCartSummary,
        removeFromCartSummary,
        clearCartSummary,
      }}
    >
      {children}
    </CartSummaryContext.Provider>
  );
}

export const useCartSummary = () => {
  const context = useContext(CartSummaryContext);
  if (!context)
    throw new Error("useCartSummary must be used within a CartSummaryProvider");
  return context;
};
