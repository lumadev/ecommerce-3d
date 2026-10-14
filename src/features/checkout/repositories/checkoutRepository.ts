import { httpClientPublic } from '@/infra/http/httpClient';
import type {
  CardPaymentInput,
  CardPaymentResult,
  CheckoutOrder,
  CheckoutStatus,
  CreateCheckoutInput,
  PaymentConfig,
} from '../types/checkout.types';

const BASE_URL = '/orders';

export const checkoutRepository = {
  getPaymentConfig: async (): Promise<PaymentConfig> => {
    const response = await httpClientPublic.get<PaymentConfig>(
      `${BASE_URL}/payment-config`,
    );
    return response.data;
  },

  createCheckout: async (input: CreateCheckoutInput): Promise<CheckoutOrder> => {
    const response = await httpClientPublic.post<CheckoutOrder>(
      `${BASE_URL}/checkout`,
      input,
    );
    return response.data;
  },

  createCardPayment: async (
    orderId: string,
    attemptKey: string,
    payment: CardPaymentInput,
  ): Promise<CardPaymentResult> => {
    const response = await httpClientPublic.post<CardPaymentResult>(
      `${BASE_URL}/${orderId}/payments/card`,
      { ...payment, attemptKey },
    );
    return response.data;
  },

  getStatus: async (
    checkoutKey: string,
    signal?: AbortSignal,
  ): Promise<CheckoutStatus> => {
    const response = await httpClientPublic.get<CheckoutStatus>(
      `${BASE_URL}/checkout/${checkoutKey}/status`,
      { signal },
    );
    return response.data;
  },
};