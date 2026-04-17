import { Product } from "@/data/products";

export interface AdminProduct extends Product {
  stock: number;
}

export interface ProductFormState {
  name: string;
  description: string;
  price: string;
  stock: string;
  category?: string;
  image?: string;
}