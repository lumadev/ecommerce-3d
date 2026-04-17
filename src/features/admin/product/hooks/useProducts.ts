import { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { AdminProduct } from "../types";

export const useProducts = () => {
  const [productList, setProductList] = useState<AdminProduct[]>(() =>
    initialProducts.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 50) + 5,
    }))
  );

  const updateProduct = (updated: AdminProduct) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const createProduct = (product: AdminProduct) => {
    setProductList((prev) => [product, ...prev]);
  };

  return {
    productList,
    updateProduct,
    createProduct,
  };
};