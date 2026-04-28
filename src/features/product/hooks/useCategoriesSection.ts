import { useEffect, useState } from "react";
import { Category } from "@/features/admin/category/types/category.types";
import { categoryRepository } from "../repositories/categoryRepository";

export const useCategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await categoryRepository.findAll();
        if (isMounted) setCategories(data);
      } catch {
        // silently fail — section simply renders nothing
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, isLoading };
};
