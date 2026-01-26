"use client";

import { eventT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface EventWineContextType {
  eventWine: eventT[];
  addToEventWine: (item: eventT) => void;
  removeFromEventWine: (id: string | number) => void;
  updateEventWine: (id: string | number, updates: Partial<eventT>) => void;
  clearEventWine: () => void;
}

const EventWineContext = createContext<EventWineContextType | undefined>(
  undefined,
);

export function EventWineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [eventWine, setEventWine] = useState<eventT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_event_wine");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("my_event_wine", JSON.stringify(eventWine));
  }, [eventWine]);

  const addToEventWine = (newItem: eventT) => {
    setEventWine((prev) => {
      const current = Array.isArray(prev) ? prev : []; // <-- ensure it's always an array
      const exists = current.find((item) => item.id === newItem.id);
      if (exists) return current; // avoid duplicates
      return [...current, newItem];
    });
  };

  const removeFromEventWine = (id: string | number) => {
    setEventWine((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.filter((item) => item.id !== id);
    });
  };

  const clearEventWine = () => {
    setEventWine([]);
    localStorage.removeItem("my_event_wine");
  };

  const updateEventWine = (id: string | number, updates: Partial<eventT>) => {
    setEventWine((prev) =>
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
    <EventWineContext.Provider
      value={{
        eventWine,
        addToEventWine,
        updateEventWine,
        removeFromEventWine,
        clearEventWine,
      }}
    >
      {children}
    </EventWineContext.Provider>
  );
}

export const useEventWine = () => {
  const context = useContext(EventWineContext);
  if (!context)
    throw new Error("useEventWine must be used within a EventWineProvider");
  return context;
};
