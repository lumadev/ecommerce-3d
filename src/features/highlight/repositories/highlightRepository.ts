import { httpClientPublic } from "@/infra/http/httpClient";
import type { Highlight, HighlightProduct } from "../types/highlight.types";

const BASE_URL = "/highlights";

type ApiHighlightProduct = Omit<HighlightProduct, "price"> & {
  price: number | string;
};

type ApiHighlight = Omit<Highlight, "product"> & {
  product: ApiHighlightProduct;
};

const normalizeHighlight = (highlight: ApiHighlight): Highlight => ({
  ...highlight,
  product: {
    ...highlight.product,
    price: Number(highlight.product.price),
  },
});

export const highlightRepository = {
  findAll: async (signal?: AbortSignal): Promise<Highlight[]> => {
    const response = await httpClientPublic.get<ApiHighlight[]>(BASE_URL, {
      signal,
    });
    return response.data.map(normalizeHighlight);
  },
};
