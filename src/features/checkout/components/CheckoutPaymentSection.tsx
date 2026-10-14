import { LockKeyhole } from 'lucide-react';
import CardPaymentBrick from './CardPaymentBrick';
import type {
  CardPaymentInput,
  PaymentConfig,
  ShippingAddressInput,
} from '../types/checkout.types';

interface CheckoutPaymentSectionProps {
  paymentConfig?: PaymentConfig;
  amount: number;
  customerEmail: string;
  customerName: string;
  shippingAddress: ShippingAddressInput;
  paymentError?: string;
  awaitingConfirmation: boolean;
  onSubmitPayment: (payment: CardPaymentInput) => Promise<void>;
}

const CheckoutPaymentSection = ({
  paymentConfig,
  amount,
  customerEmail,
  customerName,
  shippingAddress,
  paymentError,
  awaitingConfirmation,
  onSubmitPayment,
}: CheckoutPaymentSectionProps) => (
  <div>
    <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
      <LockKeyhole size={16} className="text-primary" />
      Dados do cartão protegidos pelo Mercado Pago
    </div>
    {paymentConfig?.enabled && paymentConfig.publicKey ? (
      <CardPaymentBrick
        publicKey={paymentConfig.publicKey}
        amount={amount}
        payerEmail={customerEmail}
        onSubmit={onSubmitPayment}
      />
    ) : (
      <div className="border-l-2 border-amber-500 py-3 pl-4">
        <p className="text-sm font-semibold text-foreground">Pagamento indisponível</p>
        <p className="mt-1 text-sm text-muted-foreground">
          A integração do Mercado Pago ainda não está configurada neste ambiente.
        </p>
      </div>
    )}
    {paymentError && (
      <p className="mt-4 text-sm text-destructive" role="alert">
        {paymentError}
      </p>
    )}
    {awaitingConfirmation && (
      <p className="mt-4 text-sm text-muted-foreground" role="status">
        Pagamento em análise. Estamos consultando a confirmação com segurança.
      </p>
    )}
    <p className="mt-5 text-xs leading-5 text-muted-foreground">
      O frete não está incluído nesta etapa. O valor exibido corresponde aos produtos.
    </p>
    <div className="mt-5 border-t border-border pt-4 text-sm">
      <p className="font-medium text-foreground">Entrega para</p>
      <p className="mt-1 text-muted-foreground">
        {shippingAddress.recipient.trim() || customerName}
        <br />
        {shippingAddress.street}, {shippingAddress.number}
        {shippingAddress.complement && `, ${shippingAddress.complement}`}
        <br />
        {shippingAddress.neighborhood}, {shippingAddress.city} - {shippingAddress.state.toUpperCase()}
        <br />
        CEP {shippingAddress.postalCode}
      </p>
    </div>
  </div>
);

export default CheckoutPaymentSection;