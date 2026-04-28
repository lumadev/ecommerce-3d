import { useEffect, useState } from "react";
import { toast } from "sonner";
import { categoryRepository } from "../repositories/categoryRepository";
import { categoryRepository as publicCategoryRepository } from "@/features/product/repositories/categoryRepository";
import { Category, CreateCategoryData, UpdateCategoryData } from "../types/category.types";

export const useCategories = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoading(true);

      try {
        const categories = await publicCategoryRepository.findAll();
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

  const updateCategory = async (id: string, data: UpdateCategoryData) => {
    try {
      const updated = await categoryRepository.update(id, data);
      setCategoryList((prev) => prev.map((c) => (c.id === id ? updated : c)));
      
      toast.success("Categoria atualizada com sucesso.");
      return updated;
    } catch (error) {
      toast.error("Não foi possível atualizar a categoria.");
      throw error;
    }
  };

  const createCategory = async (data: CreateCategoryData) => {
    try {
      const created = await categoryRepository.create(data);
      setCategoryList((prev) => [created, ...prev]);
      
      toast.success("Categoria criada com sucesso.");
      return created;
    } catch (error) {
      toast.error("Não foi possível criar a categoria.");
      throw error;
    }
  };

  return { categoryList, isLoading, updateCategory, createCategory };
};
