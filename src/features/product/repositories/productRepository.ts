import { httpClientAuth, httpClientPublic } from "@/infra/http/httpClient";
import { MERCHANT_CODE } from "@/shared/config/merchant";
import type {
  CreateProductData,
  CreateProductPayload,
  Product,
  ProductCategory,
  ProductListItem,
  UpdateProductData,
} from "../types/product.types";

const BASE_URL = "/products";

type ApiProduct = Omit<Product, "price"> & {
  price: number | string;
};

type ApiProductListItem = ApiProduct & {
  categories?: ProductCategory[];
};

const normalizeProductListItem = (
  product: ApiProductListItem
): ProductListItem => ({
  ...product,
  price: Number(product.price),
  categories: product.categories ?? [],
});

export const productRepository = {
  findAll: async (signal?: AbortSignal): Promise<ProductListItem[]> => {
    const response = await httpClientPublic.get<ApiProductListItem[]>(BASE_URL, {
      signal,
    });
    return response.data.map(normalizeProductListItem);
  },

  findAllForAdmin: async (signal?: AbortSignal): Promise<ProductListItem[]> => {
    const response = await httpClientAuth.get<ApiProductListItem[]>(BASE_URL, {
      signal,
    });
    return response.data.map(normalizeProductListItem);
  },

  findOne: async (
    id: string,
    signal?: AbortSignal
  ): Promise<ProductListItem> => {
    const response = await httpClientPublic.get<ApiProductListItem>(
      `${BASE_URL}/${id}`,
      { signal }
    );
    return normalizeProductListItem(response.data);
  },

  findOneForAdmin: async (id: string): Promise<Product> => {
    const response = await httpClientAuth.get<ApiProduct>(`${BASE_URL}/${id}`);
    return {
      ...response.data,
      price: Number(response.data.price),
    };
  },

  create: async (data: CreateProductData): Promise<Product> => {
    const payload: CreateProductPayload = {
      ...data,
      merchantCode: MERCHANT_CODE,
    };
    const response = await httpClientAuth.post<ApiProduct>(BASE_URL, payload);
    return {
      ...response.data,
      price: Number(response.data.price),
    };
  },

  update: async (
    id: string,
    data: UpdateProductData
  ): Promise<ProductListItem> => {
    const response = await httpClientAuth.patch<ApiProductListItem>(
      `${BASE_URL}/${id}`,
      data
    );
    return normalizeProductListItem(response.data);
  },

  remove: async (id: string): Promise<void> => {
    await httpClientAuth.delete(`${BASE_URL}/${id}`);
  },
};
