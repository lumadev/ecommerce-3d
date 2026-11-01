import { httpClientPublic } from "@/infra/http/httpClient";
import type { Category } from "../types/category.types";

const BASE_URL = "/categories";

export const categoryRepository = {
  findAll: async (signal?: AbortSignal): Promise<Category[]> => {
    const response = await httpClientPublic.get<Category[]>(BASE_URL, { signal });
    return response.data;
  },
};
