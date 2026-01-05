"use client";
import { card_list } from "@/lib/card/cart";
import {
  StepTwoInviteType,
  StepOneRegisterType,
  StepThreeInviteType,
  StepThreeRegisterType,
  StepTwoRegisterType,
  CartItemT,
  PaymentMethodT,
} from "@/lib/types";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type UserContextType = {
  token: string;
  register_success: boolean;
  forgot_pass_success: boolean;
  register_email: string;
  agree_terms_condition: boolean;
  agree_price_risk: boolean;
  agree_liquidity_risk: boolean;
  agree_collection_warning: boolean;
  register_step_one: StepOneRegisterType | null;
  register_step_two: StepTwoRegisterType | null;
  register_step_three: StepThreeRegisterType | null;
  invite_step_two: StepTwoInviteType | null;
  invite_step_three: StepThreeInviteType | null;
  vintage_table_detail: boolean;
  selected_index_vintage: number | null;
  cart_items: CartItemT[];
  filter_market: string;
  cart_total: number;
  current_investment: number;
  payment_method: PaymentMethodT[];
  balance: number;
  setUserDetails: (
    details:
      | Partial<UserContextType>
      | ((prev: UserContextType) => Partial<UserContextType>)
  ) => void;
  alertDialog: boolean;
  addPaymentMethod: (method: PaymentMethodT) => void;
  updateInvestment: (amount: number) => void;
  updatePaymentDefault: (last_code: string) => void;
};

const defaultUserContext: UserContextType = {
  alertDialog: false,
  token: "",
  balance: 1200,
  register_email: "",
  agree_terms_condition: false,
  agree_price_risk: false,
  agree_liquidity_risk: false,
  agree_collection_warning: false,
  register_step_one: null,
  register_step_two: null,
  register_step_three: null,
  invite_step_two: null,
  invite_step_three: null,
  register_success: false,
  forgot_pass_success: false,
  vintage_table_detail: false,
  selected_index_vintage: null,
  cart_items: [],
  filter_market: "vint-ex",
  cart_total: 0,
  current_investment: 500,
  payment_method: card_list,
  setUserDetails: () => {},
  addPaymentMethod: () => {},
  updateInvestment: () => {},
  updatePaymentDefault: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetailsState] =
    useState<UserContextType>(defaultUserContext);

  useEffect(() => {
    const savedUserData = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );
    setUserDetailsState((prev) => ({ ...prev, ...savedUserData }));
  }, []);

  const setUserDetails = (
    details:
      | Partial<UserContextType>
      | ((prev: UserContextType) => Partial<UserContextType>)
  ) => {
    const updatedUserDetails =
      typeof details === "function"
        ? { ...userDetails, ...details(userDetails) }
        : { ...userDetails, ...details };

    if (JSON.stringify(updatedUserDetails) !== JSON.stringify(userDetails)) {
      setUserDetailsState(updatedUserDetails as UserContextType);
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    }
  };

  const addPaymentMethod = (method: PaymentMethodT) => {
    setUserDetails((prev) => {
      // Check if already 5 cards
      if (prev.payment_method.length >= 5) {
        // You can use a toast, alert, or your own dialog
        setUserDetails({
          alertDialog: true,
        });
        return prev; // Do not add
      }

      // Make all existing cards non-default
      const updatedCards = prev.payment_method.map((c) => ({
        ...c,
        is_default: false,
      }));

      // Add the new card as default
      return {
        ...prev,
        payment_method: [...updatedCards, { ...method, is_default: true }],
      };
    });
  };

  const updateInvestment = (amount: number) => {
    setUserDetails((prev) => ({
      current_investment: prev.current_investment + amount,
    }));
  };

  const updatePaymentDefault = (last_code: string) => {
    setUserDetails((prev) => {
      let found = false;

      const updated = prev.payment_method.map((card) => {
        if (card.last_code === last_code) {
          found = true;
          return { ...card, is_default: true };
        }
        return { ...card, is_default: false };
      });

      // Optional: if no card matched, set first card as default
      if (!found && updated.length > 0) {
        updated[0].is_default = true;
      }

      return { ...prev, payment_method: updated };
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...userDetails,
        setUserDetails,
        addPaymentMethod,
        updateInvestment,
        updatePaymentDefault,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
