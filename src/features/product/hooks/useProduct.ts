import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { productRepository } from "../repositories/productRepository";
import { Product } from "@/data/products";
import { toProduct } from "../mappers/toProduct";

export const useProduct = (id?: string) => {
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setProduct(null);
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
        toast({ description: "Não foi possível carregar o produto." });
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
  }, [id]);

  return {
    product,
    isLoading,
  };
};
