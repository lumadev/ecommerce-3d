import { httpClientPublic } from "@/infra/http/httpClient";
import { MERCHANT_CODE } from "@/shared/config/merchant";
import {
  Product,
  ProductCategory,
  ProductListItem,
} from "@/features/admin/product/types/product.types";

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
      params: { merchantCode: MERCHANT_CODE },
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
      { params: { merchantCode: MERCHANT_CODE }, signal }
    );
    return normalizeProductListItem(response.data);
  },
};
