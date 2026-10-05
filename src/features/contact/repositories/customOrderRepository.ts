import { httpClientPublic } from "@/infra/http/httpClient";
import { CustomOrderRequest } from "../types";

export const customOrderRepository = {
  send: (data: CustomOrderRequest) =>
    httpClientPublic.post<void>("/email/custom-order", data),
};