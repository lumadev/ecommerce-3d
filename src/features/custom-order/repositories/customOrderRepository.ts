import { httpService } from "@/infra/http/httpService";
import { CustomOrderRequest } from "../types";

export const customOrderRepository = {
  send: (data: CustomOrderRequest) =>
    httpService.post<void>("/email/custom-order", data),
};