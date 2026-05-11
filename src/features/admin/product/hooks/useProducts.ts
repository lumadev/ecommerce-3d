import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { productRepository } from "../repositories/productRepository";
import { AdminProduct } from "../types";
import { CreateProductData, UpdateProductData } from "../types/product.types";

type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories?: string[];
  mediaUrls?: string[];
};

const toAdminProduct = (product: ProductResponse): AdminProduct => {
  const image = product.mediaUrls?.[0] ?? "";

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categories: product.categories ?? [],
    image,
    customizable: false,
  };
};

export const useProducts = () => {
  const [productList, setProductList] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const products = await productRepository.findAll(controller.signal);
        setProductList(products.map((product) => toAdminProduct(product)));
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
      const mapped = toAdminProduct(updated);

      setProductList((prev) => prev.map((p) => (p.id === id ? mapped : p)));

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
      const mapped = toAdminProduct(created);

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