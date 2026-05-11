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

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductListItem extends Product {
  categories: ProductCategory[];
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  mediaPublicIds?: string[];
  categoryIds: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  mediaPublicIds?: string[];
  categoryIds?: string[];
}
