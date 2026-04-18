import { useState } from "react";
import { categories as initialCategories, Category } from "@/data/categories";

export const useCategories = () => {
  const [categoryList, setCategoryList] = useState<Category[]>(initialCategories);

  const updateCategory = (updated: Category) => {
    setCategoryList((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const createCategory = (category: Category) => {
    setCategoryList((prev) => [category, ...prev]);
  };

  return { categoryList, updateCategory, createCategory };
};
