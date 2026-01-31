"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItemT } from "@/lib/types";

interface CartContextType {
  cart: CartItemT[];
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  addToCart: (item: CartItemT) => void;
  clearCart: () => void;
  updateCartItem: (
    id: string | number,
    updates: Partial<CartItemT>,
  ) => void;
  removeFromCart: (id: string | number) => void;
  togglePhotoRequest: (id: string | number, value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItemT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_cart");
      try {
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("cart_checked");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {
        setCheckedItems({});
      }
    } else {
      const initialChecked: Record<string, boolean> = {};
      cart.forEach((item) => {
        initialChecked[item.id.toString()] = false;
      });
      setCheckedItems(initialChecked);
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart_checked", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const addToCart = (newItem: CartItemT) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === newItem.id && item.case_size === newItem.case_size,
      );
      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [...prev, newItem];
    });

    // ✅ Always ensure checkedItems has a value for this item
    setCheckedItems((prev) => ({
      ...prev,
      [newItem.id]: prev[newItem.id] ?? false, // default false if not set
    }));
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    setCheckedItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    const savedQuantities = JSON.parse(
      localStorage.getItem("cart_quantities") || "{}",
    );
    delete savedQuantities[id];
    localStorage.setItem("cart_quantities", JSON.stringify(savedQuantities));
  };

  const clearCart = () => {
    setCart([]);
    setCheckedItems({});
    localStorage.removeItem("my_cart");
    localStorage.removeItem("cart_checked");
    localStorage.removeItem("cart_quantities");
  };

  // 👇👇👇 ADD THIS — NEW FUNCTION
  // CartContext
  const togglePhotoRequest = (id: string | number, value: boolean) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, photo_request: value } : item,
      ),
    );
  };

  const updateCartItem = (
    id: string | number,
    updates: Partial<CartItemT>,
  ) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checkedItems,
        setCheckedItems,
        updateCartItem,
        addToCart,
        clearCart,
        removeFromCart,
        togglePhotoRequest, // now it exists 👍
      }}
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
