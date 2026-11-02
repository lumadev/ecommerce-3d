import type { ProductMediaRecord } from "@/features/product/types/product-media.types";

export interface ProductVariant {
  attributeId: string;
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  media: ProductMediaRecord[];
  variants: ProductVariant[];
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductListItem extends Product {
  categories: ProductCategory[];
}
