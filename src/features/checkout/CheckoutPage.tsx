import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/features/cart/useCart';
import { getErrorMessage } from '@/infra/http/httpError';
import { isValidEmail, isValidPostalCode } from '@/lib/validation';
import CheckoutContactForm from './components/CheckoutContactForm';
import CheckoutEmptyState from './components/CheckoutEmptyState';
import CheckoutOrderSummary from './components/CheckoutOrderSummary';
import CheckoutPaymentSection from './components/CheckoutPaymentSection';
import CheckoutStepHeader from './components/CheckoutStepHeader';
import CheckoutSuccess from './components/CheckoutSuccess';
import { checkoutRepository } from './repositories/checkoutRepository';
import type {
  CheckoutErrors,
  CheckoutForm,
  CheckoutStep,
} from './types/checkout-form.types';
import type {
  CardPaymentInput,
  CheckoutOrder,
  CreateCheckoutInput,
  PaymentConfig,
  ShippingAddressInput,
} from './types/checkout.types';

const initialForm: CheckoutForm = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  shippingAddress: {
    recipient: '',
    postalCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

const validateForm = (form: CheckoutForm): CheckoutErrors => {
  const errors: CheckoutErrors = {};
  const address = form.shippingAddress;

  if (!form.customerName.trim()) errors.customerName = 'Informe seu nome';
  if (!isValidEmail(form.customerEmail)) errors.customerEmail = 'Informe um e-mail válido';
  if (form.customerPhone.replace(/\D/g, '').length < 10) {
    errors.customerPhone = 'Informe um telefone com DDD';
  }
  if (!isValidPostalCode(address.postalCode)) {
    errors.postalCode = 'Informe um CEP válido';
  }
  if (!address.street.trim()) errors.street = 'Informe a rua ou avenida';
  if (!address.number.trim()) errors.number = 'Informe o número';
  if (!address.neighborhood.trim()) errors.neighborhood = 'Informe o bairro';
  if (!address.city.trim()) errors.city = 'Informe a cidade';
  if (!/^[a-z]{2}$/i.test(address.state.trim())) errors.state = 'Use a sigla do estado';

  return errors;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartContext();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [checkoutKey, setCheckoutKey] = useState(() => crypto.randomUUID());
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [step, setStep] = useState<CheckoutStep>('contact');
  const [order, setOrder] = useState<CheckoutOrder>();
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [requestError, setRequestError] = useState<string>();
  const [paymentError, setPaymentError] = useState<string>();
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [paymentAttemptKey, setPaymentAttemptKey] = useState(() => crypto.randomUUID());
  const checkoutKeyForPolling = order?.checkoutKey;

  useEffect(() => {
    if (!awaitingConfirmation || !checkoutKeyForPolling) return;

    const controller = new AbortController();
    let isPolling = false;
    const pollStatus = async () => {
      if (isPolling) return;
      isPolling = true;
      try {
        const status = await checkoutRepository.getStatus(
          checkoutKeyForPolling,
          controller.signal,
        );
        setOrder((current) =>
          current
            ? { ...current, status: status.status, paymentStatus: status.paymentStatus }
            : current,
        );
        if (status.status === 'PAID') {
          setAwaitingConfirmation(false);
          setStep('complete');
          clearCart();
        } else if (status.status === 'PAYMENT_FAILED') {
          setAwaitingConfirmation(false);
          setPaymentAttemptKey(crypto.randomUUID());
          setPaymentError('O pagamento não foi aprovado. Confira os dados e tente novamente.');
        }
      } catch {
        // Uma falha transitória de consulta não altera o estado real do pedido.
      } finally {
        isPolling = false;
      }
    };

    void pollStatus();
    const interval = window.setInterval(() => void pollStatus(), 2500);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [awaitingConfirmation, checkoutKeyForPolling, clearCart]);

  const setCustomerField = (field: 'customerName' | 'customerEmail' | 'customerPhone', value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const setAddressField = (field: keyof ShippingAddressInput, value: string) => {
    setForm((current) => ({
      ...current,
      shippingAddress: { ...current.shippingAddress, [field]: value },
    }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsCreatingOrder(true);
    setRequestError(undefined);
    try {
      const config = await checkoutRepository.getPaymentConfig();
      setPaymentConfig(config);
      if (!config.enabled || !config.publicKey) {
        setRequestError('O pagamento ainda não está configurado neste ambiente.');
        return;
      }
      const checkoutInput: CreateCheckoutInput = {
        checkoutKey,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          customNote: item.customNote,
        })),
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim(),
        customerPhone: form.customerPhone.trim(),
        shippingAddress: {
          ...form.shippingAddress,
          recipient: form.shippingAddress.recipient.trim() || form.customerName.trim(),
        },
      };
      const createdOrder = await checkoutRepository.createCheckout(checkoutInput);
      setOrder(createdOrder);
      setPaymentConfig(config);
      setStep('payment');
    } catch (error) {
      setRequestError(getErrorMessage(error));
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleBackToContact = () => {
    setStep('contact');
    setOrder(undefined);
    setCheckoutKey(crypto.randomUUID());
    setPaymentAttemptKey(crypto.randomUUID());
    setPaymentError(undefined);
  };

  const handleCardPayment = useCallback(
    async (payment: CardPaymentInput) => {
      if (!order) return;
      setPaymentError(undefined);
      try {
        const result = await checkoutRepository.createCardPayment(
          order.id,
          paymentAttemptKey,
          payment,
        );
        setOrder((current) =>
          current
            ? {
                ...current,
                status: result.status,
                paymentStatus: result.paymentStatus,
              }
            : current,
        );

        if (result.status === 'PAID') {
          clearCart();
          setStep('complete');
        } else if (result.status === 'PAYMENT_FAILED') {
          setPaymentError('O pagamento não foi aprovado. Confira os dados do cartão e tente novamente.');
          setPaymentAttemptKey(crypto.randomUUID());
        } else {
          setAwaitingConfirmation(true);
        }
      } catch (error) {
        const message = getErrorMessage(error);
        setPaymentError(message);
        throw error;
      }
    },
    [clearCart, order, paymentAttemptKey],
  );

  const summaryItems = order?.items ?? items.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price,
    customNote: item.customNote,
  }));
  const summaryTotal = order?.total ?? items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0 && step !== 'complete') {
    return <CheckoutEmptyState />;
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        {step === 'complete' ? (
          <CheckoutSuccess
            orderId={order?.id}
            total={formatCurrency(order?.total ?? 0)}
          />
        ) : (
          <>
            <CheckoutStepHeader
              step={step}
              isBackDisabled={awaitingConfirmation}
              onBack={() => (step === 'payment' ? handleBackToContact() : navigate(-1))}
            />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <section>
                {step === 'contact' ? (
                  <CheckoutContactForm
                    form={form}
                    errors={errors}
                    isCreatingOrder={isCreatingOrder}
                    requestError={requestError}
                    onSubmit={handleContinue}
                    onCustomerFieldChange={setCustomerField}
                    onAddressFieldChange={setAddressField}
                  />
                ) : (
                  <CheckoutPaymentSection
                    paymentConfig={paymentConfig}
                    amount={order?.total ?? 0}
                    customerEmail={form.customerEmail}
                    customerName={form.customerName}
                    shippingAddress={form.shippingAddress}
                    paymentError={paymentError}
                    awaitingConfirmation={awaitingConfirmation}
                    onSubmitPayment={handleCardPayment}
                  />
                )}
              </section>

              <CheckoutOrderSummary items={summaryItems} total={summaryTotal} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;