"use client";
import {
  StepTwoInviteType,
  StepOneRegisterType,
  StepThreeInviteType,
  StepThreeRegisterType,
  StepTwoRegisterType,
  CartItemT,
} from "@/lib/types";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
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
  cart_items: CartItemT[]
  filter_market: string;
  setUserDetails: (details: Partial<UserContextType>) => void;
};

const defaultUserContext: UserContextType = {
  token: "",
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
  setUserDetails: () => {},
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

  const setUserDetails = (details: Partial<UserContextType>) => {
    const updatedUserDetails = { ...userDetails, ...details };

    // Check if the details have actually changed before updating
    if (JSON.stringify(updatedUserDetails) !== JSON.stringify(userDetails)) {
      setUserDetailsState(updatedUserDetails as UserContextType);
      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    }
  };

  return (
    <UserContext.Provider value={{ ...userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
