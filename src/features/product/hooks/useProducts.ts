import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { productRepository } from "../repositories/productRepository";
import { ProductListItem } from "@/features/admin/product/types/product.types";
import { Product } from "@/data/products";

const toProduct = (product: ProductListItem): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.mediaUrls[0] ?? "",
  media: product.mediaUrls.map((src) => ({ type: "image", src })),
  categories: product.categories.map((category) => category.name),
  customizable: false,
});

export const useProducts = () => {
  const { toast } = useToast();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const products = await productRepository.findAll(controller.signal);
        setProductList(products.map(toProduct));
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        toast({ description: "Não foi possível carregar os produtos." });
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

  return {
    productList,
    isLoading,
  };
};
