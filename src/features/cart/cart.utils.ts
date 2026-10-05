import { CartItem } from "./cart.types";
import { Product } from "@/data/products";

export const addItemToCart = (
  items: CartItem[],
  product: Product,
  customNote?: string
): CartItem[] => {
  const existing = items.find((i) => i.product.id === product.id);

  if (existing) {
    if (product.stock !== undefined && existing.quantity >= product.stock) {
      return items;
    }

    return items.map((i) =>
      i.product.id === product.id
        ? {
            ...i,
            product,
            quantity: Math.min(i.quantity + 1, product.stock ?? Infinity),
          }
        : i
    );
  }

  if (product.stock !== undefined && product.stock <= 0) {
    return items;
  }

  return [...items, { product, quantity: 1, customNote }];
};

export const removeItemFromCart = (
  items: CartItem[],
  productId: string
): CartItem[] => {
  return items.filter((i) => i.product.id !== productId);
};

export const updateItemQuantity = (
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] => {
  if (quantity <= 0) {
    return items.filter((i) => i.product.id !== productId);
  }

  return items
    .map((i) =>
      i.product.id === productId
        ? { ...i, quantity: Math.min(quantity, i.product.stock ?? quantity) }
        : i
    )
    .filter((i) => i.quantity > 0);
};

export const clearCartItems = (): CartItem[] => {
  return [];
};