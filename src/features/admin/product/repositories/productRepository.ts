import { httpClientAuth } from "@/infra/http/httpClient";
import {
  Product,
  CreateProductData,
  UpdateProductData,
} from "../types/product.types";

const BASE_URL = "/products";

export const productRepository = {
  findAll: async (signal?: AbortSignal): Promise<Product[]> => {
    const response = await httpClientAuth.get<Product[]>(BASE_URL, { signal });
    return response.data;
  },

  create: async (data: CreateProductData): Promise<Product> => {
    const response = await httpClientAuth.post<Product>(BASE_URL, data);
    return response.data;
  },

  findOne: async (id: string): Promise<Product> => {
    const response = await httpClientAuth.get<Product>(`${BASE_URL}/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateProductData): Promise<Product> => {
    const response = await httpClientAuth.patch<Product>(
      `${BASE_URL}/${id}`,
      data
    );
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await httpClientAuth.delete(`${BASE_URL}/${id}`);
  },
};
