import { CartItemT } from "@/lib/types";

let cart_item: CartItemT[] = [];

export const getCart = () => cart_item;

export const addToMockCart = (item: CartItemT) => {
  cart_item = [...cart_item, item];
};

export const clearMockCart = () => {
  cart_item = [];
};
