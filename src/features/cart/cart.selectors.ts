import { CartItem } from "./cart.types";

export const getTotalItems = (items: CartItem[]) => {
  return items.reduce((sum, i) => sum + i.quantity, 0);
};

export const getTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
};