"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SubAccountType } from "@/lib/types";

interface SubAccountContextType {
  subAccounts: SubAccountType[];
  addSubAccount: (item: SubAccountType) => void;
  updateSubAccount: (
    id: string | number,
    updates: Partial<SubAccountType>
  ) => void;
  removeSubAccount: (id: string | number) => void;
  clearSubAccounts: () => void;
}

const SubAccountContext = createContext<SubAccountContextType | undefined>(
  undefined
);

export function SubAccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subAccounts, setSubAccounts] = useState<SubAccountType[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my_sub_accounts");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("my_sub_accounts", JSON.stringify(subAccounts));
  }, [subAccounts]);

  useEffect(() => {
    setSubAccounts((prev) => {
      const active = prev.filter((i) => i.is_active);
      if (active.length <= 1) return prev;

      let found = false;
      return prev.map((item) => {
        if (item.is_active && !found) {
          found = true;
          return item;
        }
        return { ...item, is_active: false };
      });
    });
  }, []);

  const addSubAccount = (newItem: SubAccountType) => {
    setSubAccounts((prev) => {
      const filtered = prev.filter((item) => item.id !== newItem.id);

      return newItem.is_active
        ? [...filtered.map((item) => ({ ...item, is_active: false })), newItem]
        : [...filtered, newItem];
    });
  };

  const updateSubAccount = (
    id: string | number,
    updates: Partial<SubAccountType>
  ) => {
    setSubAccounts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }

        if (updates.is_active === true) {
          return { ...item, is_active: false };
        }

        return item;
      })
    );
  };

  const removeSubAccount = (id: string | number) => {
    setSubAccounts((prev) => prev.filter((item) => item.id !== id));
  };

  const clearSubAccounts = () => {
    setSubAccounts([]);
    localStorage.removeItem("my_sub_accounts");
  };

  return (
    <SubAccountContext.Provider
      value={{
        subAccounts,
        addSubAccount,
        updateSubAccount,
        removeSubAccount,
        clearSubAccounts,
      }}
    >
      {children}
    </SubAccountContext.Provider>
  );
}

export const useSubAccount = () => {
  const context = useContext(SubAccountContext);
  if (!context)
    throw new Error("useSubAccount must be used within a SubAccountProvider");
  return context;
};
