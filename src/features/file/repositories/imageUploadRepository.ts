import { httpClientAuth } from "@/infra/http/httpClient";
import { MERCHANT_CODE } from "@/shared/config/merchant";
import type { ProductMediaType } from "@/features/product/types/product-media.types";

interface UploadMediaResponse {
  url: string;
  public_id: string;
  media_type: ProductMediaType;
  format: string;
  poster?: string;
}

type UploadFolder = "categories" | "products";

export const mediaUploadRepository = {
  upload: async (
    file: File,
    folder: UploadFolder,
    mediaType: ProductMediaType = "image",
  ): Promise<UploadMediaResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("mediaType", mediaType);
    formData.append("merchantCode", MERCHANT_CODE);

    const response = await httpClientAuth.post<UploadMediaResponse>(
      "/upload",
      formData,
      { timeout: 300_000 },
    );

    return response.data;
  },
  delete: async (
    publicId: string,
    mediaType: ProductMediaType = "image",
  ): Promise<void> => {
    const response = await httpClientAuth.delete<{ result: string }>("/upload", {
      data: {
        public_id: publicId,
        media_type: mediaType,
        merchantCode: MERCHANT_CODE,
      },
    });
    if (response.data.result === "error") {
      throw new Error(`Could not delete ${mediaType} media ${publicId}.`);
    }
  },
};

export const imageUploadRepository = mediaUploadRepository;
