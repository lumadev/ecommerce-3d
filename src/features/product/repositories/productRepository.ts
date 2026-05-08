import { httpClientPublic } from "@/infra/http/httpClient";
import { Product } from "@/features/admin/product/types/product.types";

const BASE_URL = "/products";

export const productRepository = {
  findAll: async (): Promise<Product[]> => {
    const response = await httpClientPublic.get<Product[]>(BASE_URL);
    return response.data;
  },
};
