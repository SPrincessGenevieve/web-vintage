"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItemT } from "@/lib/types";

interface CartContextType {
  cart: CartItemT[];
  addToCart: (item: CartItemT) => void;
  clearCart: () => void;
  removeFromCart: (id: string | number) => void; // ✅ Add this
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemT[]>([]);

  // Load cart on mount
  useEffect(() => {
    const saved = localStorage.getItem("my_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    const savedQuantities = JSON.parse(
      localStorage.getItem("cart_quantities") || "{}"
    );
    delete savedQuantities[id];
    localStorage.setItem("cart_quantities", JSON.stringify(savedQuantities));
  };

  const addToCart = (newItem: CartItemT) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === newItem.id && item.case_size === newItem.case_size
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, newItem];
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("my_cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart }} // ✅ now valid
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
