import { useEffect, useRef, useState } from 'react';
import type { CardPaymentInput } from '../types/checkout.types';
import { loadMercadoPagoSdk } from '../services/mercadoPagoSdkService';
import type { CardPaymentBrickController } from '../services/mercadoPagoSdkService';

interface CardPaymentBrickProps {
  publicKey: string;
  amount: number;
  payerEmail: string;
  onSubmit: (payment: CardPaymentInput) => Promise<void>;
}

const CardPaymentBrick = ({
  publicKey,
  amount,
  payerEmail,
  onSubmit,
}: CardPaymentBrickProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const submitRef = useRef(onSubmit);

  useEffect(() => {
    submitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    let isMounted = true;
    let controller: CardPaymentBrickController | undefined;

    const mountBrick = async () => {
      try {
        await loadMercadoPagoSdk();
        if (!isMounted || !window.MercadoPago) return;

        const mercadoPago = new window.MercadoPago(publicKey, { locale: 'pt-BR' });
        controller = await mercadoPago.bricks().create(
          'cardPayment',
          'checkout-card-payment-brick',
          {
            initialization: { amount, payer: { email: payerEmail } },
            customization: {
              paymentMethods: { minInstallments: 1, maxInstallments: 12 },
            },
            callbacks: {
              onReady: () => setIsLoading(false),
              onSubmit: async (data) => {
                setErrorMessage(undefined);
                await submitRef.current({
                  token: data.token,
                  payment_method_id: data.payment_method_id,
                  installments: data.installments,
                  issuer_id: data.issuer_id,
                });
              },
              onError: () => {
                setErrorMessage('Não foi possível carregar o formulário de pagamento. Tente novamente.');
                setIsLoading(false);
              },
            },
          },
        );
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Não foi possível carregar o formulário de pagamento.',
          );
          setIsLoading(false);
        }
      }
    };

    void mountBrick();
    return () => {
      isMounted = false;
      void controller?.unmount();
    };
  }, [amount, payerEmail, publicKey]);

  return (
    <div>
      {isLoading && (
        <p className="py-5 text-sm text-muted-foreground" role="status">
          Carregando pagamento seguro...
        </p>
      )}
      <div id="checkout-card-payment-brick" />
      {errorMessage && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CardPaymentBrick;