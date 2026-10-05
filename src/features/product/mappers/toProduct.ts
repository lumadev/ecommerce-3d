import { ProductListItem } from "@/features/admin/product/types/product.types";
import { Product } from "@/data/products";
import type { ProductMedia } from "@/data/products";
import type {
  ProductMediaRecord,
  ProductMediaType,
} from "@/features/product/types/product-media.types";

interface ProductMediaSource {
  mediaUrls: string[];
  mediaTypes?: ProductMediaType[];
  media?: ProductMediaRecord[];
}

export const toProductMedia = (product: ProductMediaSource): ProductMedia[] => {
  if (product.media?.length) {
    return product.media.map((item) =>
      item.type === "video"
        ? { type: "video", src: item.src, poster: item.poster }
        : { type: "image", src: item.src },
    );
  }

  return product.mediaUrls.map((src, index) => ({
    type: product.mediaTypes?.[index] ?? "image",
    src,
  }));
};

export const toProduct = (product: ProductListItem): Product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  stock: product.stock,
  image: toProductMedia(product)[0]?.src ?? "",
  media: toProductMedia(product),
  categories: product.categories.map((category) => category.name),
  customizable: false,
});
