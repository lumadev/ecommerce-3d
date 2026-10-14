import type { CardPaymentInput } from '../types/checkout.types';

export interface MercadoPagoBrickFormData extends CardPaymentInput {
  payer?: { email?: string };
}

export interface CardPaymentBrickController {
  unmount: () => Promise<void> | void;
}

interface CardPaymentBrickBuilder {
  create: (
    type: 'cardPayment',
    containerId: string,
    settings: {
      initialization: { amount: number; payer: { email: string } };
      customization: {
        paymentMethods: { minInstallments: number; maxInstallments: number };
      };
      callbacks: {
        onReady: () => void;
        onSubmit: (data: MercadoPagoBrickFormData) => Promise<void>;
        onError: () => void;
      };
    },
  ) => Promise<CardPaymentBrickController>;
}

interface MercadoPagoSdk {
  bricks: () => CardPaymentBrickBuilder;
}

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options: { locale: string },
    ) => MercadoPagoSdk;
  }
}

let sdkPromise: Promise<void> | undefined;

export const loadMercadoPagoSdk = (): Promise<void> => {
  if (window.MercadoPago) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-mercadopago-sdk="true"]',
    );
    const script = existingScript ?? document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.dataset.mercadopagoSdk = 'true';
    script.onload = () => resolve();
    script.onerror = () => {
      sdkPromise = undefined;
      script.remove();
      reject(new Error('Falha ao carregar o SDK do Mercado Pago.'));
    };

    if (!existingScript) document.head.appendChild(script);
  });

  return sdkPromise;
};