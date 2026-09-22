export interface HighlightProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  mediaUrls: string[];
}

export interface Highlight {
  id: string;
  productId: string;
  position: number;
  product: HighlightProduct;
}
