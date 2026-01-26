"use client";

import { ActivitiesT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ActivitiesContextType {
  activities: ActivitiesT[];
  addToActivities: (item: ActivitiesT) => void;
  updateActivitiesItem: (
    id: string | number,
    updates: Partial<ActivitiesT>
  ) => void;
  removeFromActivities: (id: string | number) => void;
  clearActivities: () => void;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

export function ActivitiesProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<ActivitiesT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_activities");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist activities to localStorage
  useEffect(() => {
    localStorage.setItem("my_activities", JSON.stringify(activities));
  }, [activities]);

  const addToActivities = (newItem: ActivitiesT) => {
    setActivities((prev) => {
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

  const removeFromActivities = (id: string | number) => {
    setActivities((prev) => prev.filter((item) => item.id !== id));
  };

  const clearActivities = () => {
    setActivities([]);
    localStorage.removeItem("my_activities");
  };

  const updateActivitiesItem = (
    id: string | number,
    updates: Partial<ActivitiesT>
  ) => {
    setActivities((prev) =>
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
    <ActivitiesContext.Provider
      value={{
        activities,
        addToActivities,
        removeFromActivities,
        clearActivities,
        updateActivitiesItem,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context)
    throw new Error("useActivities must be used within a ActivitiesProvider");
  return context;
};
