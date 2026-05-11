import { httpClientAuth } from "@/infra/http/httpClient";
import {
  Product,
  CreateProductData,
  UpdateProductData,
} from "../types/product.types";

const BASE_URL = "/products";

type ApiProduct = Omit<Product, "price"> & {
  price: number | string;
};

const normalizeProduct = (product: ApiProduct): Product => ({
  ...product,
  price: Number(product.price),
});

export const productRepository = {
  findAll: async (signal?: AbortSignal): Promise<Product[]> => {
    const response = await httpClientAuth.get<ApiProduct[]>(BASE_URL, { signal });
    return response.data.map(normalizeProduct);
  },

  create: async (data: CreateProductData): Promise<Product> => {
    const response = await httpClientAuth.post<ApiProduct>(BASE_URL, data);
    return normalizeProduct(response.data);
  },

  findOne: async (id: string): Promise<Product> => {
    const response = await httpClientAuth.get<ApiProduct>(`${BASE_URL}/${id}`);
    return normalizeProduct(response.data);
  },

  update: async (id: string, data: UpdateProductData): Promise<Product> => {
    const response = await httpClientAuth.patch<ApiProduct>(
      `${BASE_URL}/${id}`,
      data
    );
    return normalizeProduct(response.data);
  },

  remove: async (id: string): Promise<void> => {
    await httpClientAuth.delete(`${BASE_URL}/${id}`);
  },
};
