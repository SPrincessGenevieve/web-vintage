"use client";

import { eventT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface EventSportContextType {
  eventSport: eventT[];
  addToEventSport: (item: eventT) => void;
  removeFromEventSport: (id: string | number) => void;
  updateEventSport: (id: string | number, updates: Partial<eventT>) => void;
  clearEventSport: () => void;
}

const EventSportContext = createContext<EventSportContextType | undefined>(
  undefined,
);

export function EventSportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [eventSport, setEventSport] = useState<eventT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_event_sport");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("my_event_sport", JSON.stringify(eventSport));
  }, [eventSport]);

  const addToEventSport = (newItem: eventT) => {
    setEventSport((prev) => {
      const current = Array.isArray(prev) ? prev : []; // <-- ensure it's always an array
      const exists = current.find((item) => item.id === newItem.id);
      if (exists) return current; // avoid duplicates
      return [...current, newItem];
    });
  };

  const removeFromEventSport = (id: string | number) => {
    setEventSport((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.filter((item) => item.id !== id);
    });
  };

  const clearEventSport = () => {
    setEventSport([]);
    localStorage.removeItem("my_event_sport");
  };

  const updateEventSport = (id: string | number, updates: Partial<eventT>) => {
    setEventSport((prev) =>
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
    <EventSportContext.Provider
      value={{
        eventSport,
        addToEventSport,
        updateEventSport,
        removeFromEventSport,
        clearEventSport,
      }}
    >
      {children}
    </EventSportContext.Provider>
  );
}

export const useEventSport = () => {
  const context = useContext(EventSportContext);
  if (!context)
    throw new Error("useEventSport must be used within a EventSportProvider");
  return context;
};
