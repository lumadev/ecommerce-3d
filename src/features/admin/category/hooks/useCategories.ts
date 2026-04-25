import { useEffect, useState } from "react";
import { toast } from "sonner";
import { categoryRepository } from "../repositories/categoryRepository";
import { Category } from "../types/category.types";

export const useCategories = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoading(true);

      try {
        const categories = await categoryRepository.findAll();
        if (isMounted) {
          setCategoryList(categories);
        }
      } catch (error) {
        toast.error("Nao foi possivel carregar as categorias.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateCategory = (updated: Category) => {
    setCategoryList((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const createCategory = (category: Category) => {
    setCategoryList((prev) => [category, ...prev]);
  };

  return { categoryList, isLoading, updateCategory, createCategory };
};
