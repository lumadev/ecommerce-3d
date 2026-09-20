import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { productRepository } from "../repositories/productRepository";
import { Product } from "@/data/products";
import { toProduct } from "../mappers/toProduct";

export const useProduct = (id?: string, cachedProduct?: Product) => {
  const { toast } = useToast();
  const hasValidCache = !!cachedProduct && cachedProduct.id === id;
  const [product, setProduct] = useState<Product | null>(
    hasValidCache ? cachedProduct : null
  );
  const [isLoading, setIsLoading] = useState(!hasValidCache);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    if (cachedProduct && cachedProduct.id === id) {
      setProduct(cachedProduct);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadProduct = async () => {
      setIsLoading(true);

      try {
        const found = await productRepository.findOne(id, controller.signal);
        setProduct(toProduct(found));
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setProduct(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      controller.abort();
    };
  }, [id, cachedProduct]);

  return {
    product,
    isLoading,
  };
};
