export interface ProductFormState {
  name: string;
  description: string;
  price: string;
  stock: string;
  image?: string;
  mediaPublicIds: string[];
  categoryIds: string[];
}