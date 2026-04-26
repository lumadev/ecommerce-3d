import { useEffect, useState } from "react";
import { toast } from "sonner";
import { categoryRepository } from "../repositories/categoryRepository";
import { Category, CreateCategoryData, UpdateCategoryData } from "../types/category.types";

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
