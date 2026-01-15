"use client";

import { DeliverT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DeliveryContextType {
  delivery: DeliverT[];
  addToDelivery: (item: DeliverT) => void;
  updateDeliveryItem: (id: string | number, updates: Partial<DeliverT>) => void;
  removeFromDelivery: (id: string | number) => void;
  clearDelivery: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined
);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [delivery, setDelivery] = useState<DeliverT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_delivery");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist Rare to localStorage
  useEffect(() => {
    localStorage.setItem("my_delivery", JSON.stringify(delivery));
  }, [delivery]);

  const addToDelivery = (newItem: DeliverT) => {
    if (!newItem?.id) {
      console.warn("Cannot add delivery item without id:", newItem);
      return;
    }

    setDelivery((prev) => {
      const current = Array.isArray(prev) ? prev : [];

      const index = current.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        const updated = [...current];
        updated[index] = newItem;
        return updated;
      }

      return [...current, newItem];
    });
  };

  const removeFromDelivery = (id: string | number) => {
    setDelivery((prev) => prev.filter((item) => item.id !== id));
  };

  const clearDelivery = () => {
    setDelivery([]);
    localStorage.removeItem("my_delivery");
  };

  const updateDeliveryItem = (
    id: string | number,
    updates: Partial<DeliverT>
  ) => {
    setDelivery((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates, // ✅ only override provided fields
            }
          : item
      )
    );
  };

  return (
    <DeliveryContext.Provider
      value={{
        delivery,
        addToDelivery,
        removeFromDelivery,
        clearDelivery,
        updateDeliveryItem,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context)
    throw new Error("useDelivery must be used within a DeliveryProvider");
  return context;
};
