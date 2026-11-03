import { useEffect, useState } from "react";
import { Category } from "@/features/category/types/category.types";
import { categoryRepository } from "@/features/category/repositories/categoryRepository";
import { useToast } from "@/hooks/use-toast";

export const useCategoriesSection = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const data = await categoryRepository.findAll(controller.signal);
        setCategories(data);
      } catch {
        if (controller.signal.aborted) return;
        toast({ description: "Não foi possível carregar as categorias." });
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [toast]);

  return { categories, isLoading };
};
