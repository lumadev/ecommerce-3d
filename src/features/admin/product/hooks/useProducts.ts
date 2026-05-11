import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { productRepository } from "../repositories/productRepository";
import {
  CreateProductData,
  Product,
  ProductListItem,
  UpdateProductData,
} from "../types/product.types";

const toListItemWithoutCategories = (product: Product): ProductListItem => ({
  ...product,
  categories: [],
});

export const useProducts = () => {
  const [productList, setProductList] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const products = await productRepository.findAll(controller.signal);
        setProductList(products);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        toast.error("Nao foi possível carregar os produtos.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const updateProduct = async (id: string, data: UpdateProductData) => {
    try {
      const updated = await productRepository.update(id, data);
      const mapped = toListItemWithoutCategories(updated);

      setProductList((prev) =>
        prev.map((p) => {
          if (p.id !== id) {
            return p;
          }

          return {
            ...mapped,
            categories: p.categories,
          };
        })
      );

      toast.success("Produto atualizado com sucesso.");
      return mapped;
    } catch (error) {
      toast.error("Não foi possível atualizar o produto.");
      throw error;
    }
  };

  const createProduct = async (data: CreateProductData) => {
    try {
      const created = await productRepository.create(data);
      const mapped = toListItemWithoutCategories(created);

      setProductList((prev) => [mapped, ...prev]);

      toast.success("Produto criado com sucesso.");
      return mapped;
    } catch (error) {
      toast.error("Não foi possível criar o produto.");
      throw error;
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await productRepository.remove(id);
      setProductList((prev) => prev.filter((p) => p.id !== id));

      toast.success("Produto removido com sucesso.");
    } catch (error) {
      toast.error("Não foi possível remover o produto.");
      throw error;
    }
  };

  return {
    productList,
    isLoading,
    updateProduct,
    createProduct,
    removeProduct,
  };
};