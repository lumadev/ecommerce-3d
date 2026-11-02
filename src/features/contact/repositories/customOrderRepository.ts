import { httpClientPublic } from "@/infra/http/httpClient";
import { MERCHANT_CODE } from "@/shared/config/merchant";
import { CustomOrderRequest } from "../types";

export const customOrderRepository = {
  send: (data: CustomOrderRequest) =>
    httpClientPublic.post<void>("/email/custom-order", {
      ...data,
      merchantCode: MERCHANT_CODE,
    }),
};