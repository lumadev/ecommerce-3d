import { httpClientPublic } from "@/infra/http/httpClient";
import { Category } from "@/features/admin/category/types/category.types";

const BASE_URL = "/categories";

export const categoryRepository = {
  findAll: async (): Promise<Category[]> => {
    const response = await httpClientPublic.get<Category[]>(BASE_URL);
    return response.data;
  },
};
