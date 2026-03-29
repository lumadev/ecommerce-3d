import React, { useState, useCallback, useMemo } from "react";

import { CartContext } from "./cart.context";
import { CartItem } from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCartItems,
} from "./cart.utils";
import { getTotalItems, getTotalPrice } from "./cart.selectors";
import { Product } from "@/data/products";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, customNote?: string) => {
    setItems((prev) => addItemToCart(prev, product, customNote));
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => removeItemFromCart(prev, productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => updateItemQuantity(prev, productId, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setItems(clearCartItems());
  }, []);

  const totalItems = useMemo(() => getTotalItems(items), [items]);
  const totalPrice = useMemo(() => getTotalPrice(items), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};