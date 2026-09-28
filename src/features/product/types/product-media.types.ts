export type ProductMediaType = "image" | "video";

export interface ProductMediaRecord {
  type: ProductMediaType;
  src: string;
  poster?: string;
  publicId?: string;
  format?: string;
  position?: number;
}

export interface ProductMediaInput {
  type: ProductMediaType;
  publicId: string;
  format?: string;
}
