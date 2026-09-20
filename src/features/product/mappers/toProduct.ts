import { ProductListItem } from "@/features/admin/product/types/product.types";
import { Product } from "@/data/products";

export const toProduct = (product: ProductListItem): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.mediaUrls[0] ?? "",
  media: product.mediaUrls.map((src) => ({ type: "image", src })),
  categories: product.categories.map((category) => category.name),
  customizable: false,
});
