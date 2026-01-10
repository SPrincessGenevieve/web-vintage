"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SubAccountType } from "@/lib/types"; // ✅ replace CartItemT with SubAccountT

interface SubAccountContextType {
  subAccounts: SubAccountType[];
  addSubAccount: (item: SubAccountType) => void;
  updateSubAccount: (id: string | number, updates: Partial<SubAccountType>) => void;
  removeSubAccount: (id: string | number) => void;
  clearSubAccounts: () => void;
}

const SubAccountContext = createContext<SubAccountContextType | undefined>(
  undefined
);

export function SubAccountProvider({ children }: { children: React.ReactNode }) {
  const [subAccounts, setSubAccounts] = useState<SubAccountType[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_sub_accounts");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Persist subAccounts to localStorage
  useEffect(() => {
    localStorage.setItem("my_sub_accounts", JSON.stringify(subAccounts));
  }, [subAccounts]);

  const addSubAccount = (newItem: SubAccountType) => {
    setSubAccounts((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const index = current.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        const updated = [...current];
        updated[index] = newItem; // replace existing sub-account
        return updated;
      }

      return [...current, newItem]; // add new sub-account
    });
  };

  const removeSubAccount = (id: string | number) => {
    setSubAccounts((prev) => prev.filter((item) => item.id !== id));
  };

  const clearSubAccounts = () => {
    setSubAccounts([]);
    localStorage.removeItem("my_sub_accounts");
  };

  const updateSubAccount = (id: string | number, updates: Partial<SubAccountType>) => {
    setSubAccounts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates, // only override provided fields
            }
          : item
      )
    );
  };

  return (
    <SubAccountContext.Provider
      value={{
        subAccounts,
        addSubAccount,
        removeSubAccount,
        clearSubAccounts,
        updateSubAccount,
      }}
    >
      {children}
    </SubAccountContext.Provider>
  );
}

export const useSubAccount = () => {
  const context = useContext(SubAccountContext);
  if (!context) throw new Error("useSubAccount must be used within a SubAccountProvider");
  return context;
};
