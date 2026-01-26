"use client";

import { StorageInviteT } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface BookContextType {
  book: StorageInviteT[];
  addToBook: (item: StorageInviteT) => void;
  updateBookItem: (
    id: string | number,
    updates: Partial<StorageInviteT>,
  ) => void;
  removeFromBook: (id: string | number) => void;
  clearBook: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [book, setBook] = useState<StorageInviteT[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_book");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist book to localStorage
  useEffect(() => {
    localStorage.setItem("my_book", JSON.stringify(book));
  }, [book]);

  const addToBook = (newItem: StorageInviteT) => {
    setBook((prev) => {
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

  const removeFromBook = (id: string | number) => {
    setBook((prev) => prev.filter((item) => item.id !== id));
  };

  const clearBook = () => {
    setBook([]);
    localStorage.removeItem("my_book");
  };

  const updateBookItem = (
    id: string | number,
    updates: Partial<StorageInviteT>,
  ) => {
    setBook((prev) =>
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
    <BookContext.Provider
      value={{
        book,
        addToBook,
        removeFromBook,
        clearBook,
        updateBookItem,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBook must be used within a BookProvider");
  return context;
};
