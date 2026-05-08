export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  mediaUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  mediaPublicIds?: string[];
  categories?: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  mediaPublicIds?: string[];
  categories?: string[];
}
