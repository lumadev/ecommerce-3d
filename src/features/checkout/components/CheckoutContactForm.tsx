import type { FormEvent } from 'react';
import type {
  CheckoutErrors,
  CheckoutField,
  CheckoutForm,
} from '../types/checkout-form.types';
import type { ShippingAddressInput } from '../types/checkout.types';

interface CheckoutContactFormProps {
  form: CheckoutForm;
  errors: CheckoutErrors;
  isCreatingOrder: boolean;
  requestError?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCustomerFieldChange: (
    field: 'customerName' | 'customerEmail' | 'customerPhone',
    value: string,
  ) => void;
  onAddressFieldChange: (field: keyof ShippingAddressInput, value: string) => void;
}

const CheckoutContactForm = ({
  form,
  errors,
  isCreatingOrder,
  requestError,
  onSubmit,
  onCustomerFieldChange,
  onAddressFieldChange,
}: CheckoutContactFormProps) => {
  const fieldErrorId = (field: CheckoutField) =>
    errors[field] ? `checkout-error-${field}` : undefined;

  const inputClassName = (field: CheckoutField) =>
    `mt-1 w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary ${errors[field] ? 'border-destructive' : 'border-border'}`;

  const renderFieldError = (field: CheckoutField) =>
    errors[field] ? (
      <span
        id={`checkout-error-${field}`}
        className="mt-1 block text-xs text-destructive"
        role="alert"
      >
        {errors[field]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="mb-3 font-display text-lg font-semibold text-foreground">
          Seus dados
        </legend>
        <div>
          <label htmlFor="checkout-name" className="text-sm font-medium text-foreground">
            Nome completo
          </label>
          <input
            id="checkout-name"
            autoComplete="name"
            value={form.customerName}
            onChange={(event) => onCustomerFieldChange('customerName', event.target.value)}
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={fieldErrorId('customerName')}
            className={inputClassName('customerName')}
          />
          {renderFieldError('customerName')}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-email" className="text-sm font-medium text-foreground">
              E-mail
            </label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={form.customerEmail}
              onChange={(event) => onCustomerFieldChange('customerEmail', event.target.value)}
              aria-invalid={Boolean(errors.customerEmail)}
              aria-describedby={fieldErrorId('customerEmail')}
              className={inputClassName('customerEmail')}
            />
            {renderFieldError('customerEmail')}
          </div>
          <div>
            <label htmlFor="checkout-phone" className="text-sm font-medium text-foreground">
              Celular com DDD
            </label>
            <input
              id="checkout-phone"
              type="tel"
              autoComplete="tel"
              value={form.customerPhone}
              onChange={(event) => onCustomerFieldChange('customerPhone', event.target.value)}
              aria-invalid={Boolean(errors.customerPhone)}
              aria-describedby={fieldErrorId('customerPhone')}
              className={inputClassName('customerPhone')}
            />
            {renderFieldError('customerPhone')}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 font-display text-lg font-semibold text-foreground">
          Endereço de entrega
        </legend>
        <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
          <div>
            <label htmlFor="checkout-postal-code" className="text-sm font-medium text-foreground">
              CEP
            </label>
            <input
              id="checkout-postal-code"
              autoComplete="postal-code"
              inputMode="numeric"
              value={form.shippingAddress.postalCode}
              onChange={(event) => onAddressFieldChange('postalCode', event.target.value)}
              aria-invalid={Boolean(errors.postalCode)}
              aria-describedby={fieldErrorId('postalCode')}
              className={inputClassName('postalCode')}
            />
            {renderFieldError('postalCode')}
          </div>
          <div>
            <label htmlFor="checkout-recipient" className="text-sm font-medium text-foreground">
              Quem recebe
            </label>
            <input
              id="checkout-recipient"
              autoComplete="shipping name"
              placeholder={form.customerName || 'Nome do destinatário'}
              value={form.shippingAddress.recipient}
              onChange={(event) => onAddressFieldChange('recipient', event.target.value)}
              className={inputClassName('recipient')}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <div>
            <label htmlFor="checkout-street" className="text-sm font-medium text-foreground">
              Rua ou avenida
            </label>
            <input
              id="checkout-street"
              autoComplete="address-line1"
              value={form.shippingAddress.street}
              onChange={(event) => onAddressFieldChange('street', event.target.value)}
              aria-invalid={Boolean(errors.street)}
              aria-describedby={fieldErrorId('street')}
              className={inputClassName('street')}
            />
            {renderFieldError('street')}
          </div>
          <div>
            <label htmlFor="checkout-number" className="text-sm font-medium text-foreground">
              Número
            </label>
            <input
              id="checkout-number"
              autoComplete="address-line2"
              value={form.shippingAddress.number}
              onChange={(event) => onAddressFieldChange('number', event.target.value)}
              aria-invalid={Boolean(errors.number)}
              aria-describedby={fieldErrorId('number')}
              className={inputClassName('number')}
            />
            {renderFieldError('number')}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-complement" className="text-sm font-medium text-foreground">
              Complemento <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="checkout-complement"
              autoComplete="address-line3"
              value={form.shippingAddress.complement}
              onChange={(event) => onAddressFieldChange('complement', event.target.value)}
              className={inputClassName('complement')}
            />
          </div>
          <div>
            <label htmlFor="checkout-neighborhood" className="text-sm font-medium text-foreground">
              Bairro
            </label>
            <input
              id="checkout-neighborhood"
              autoComplete="address-level3"
              value={form.shippingAddress.neighborhood}
              onChange={(event) => onAddressFieldChange('neighborhood', event.target.value)}
              aria-invalid={Boolean(errors.neighborhood)}
              aria-describedby={fieldErrorId('neighborhood')}
              className={inputClassName('neighborhood')}
            />
            {renderFieldError('neighborhood')}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
          <div>
            <label htmlFor="checkout-city" className="text-sm font-medium text-foreground">
              Cidade
            </label>
            <input
              id="checkout-city"
              autoComplete="address-level2"
              value={form.shippingAddress.city}
              onChange={(event) => onAddressFieldChange('city', event.target.value)}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={fieldErrorId('city')}
              className={inputClassName('city')}
            />
            {renderFieldError('city')}
          </div>
          <div>
            <label htmlFor="checkout-state" className="text-sm font-medium text-foreground">
              Estado
            </label>
            <input
              id="checkout-state"
              autoComplete="address-level1"
              maxLength={2}
              value={form.shippingAddress.state}
              onChange={(event) =>
                onAddressFieldChange('state', event.target.value.toUpperCase())
              }
              aria-invalid={Boolean(errors.state)}
              aria-describedby={fieldErrorId('state')}
              className={inputClassName('state')}
            />
            {renderFieldError('state')}
          </div>
        </div>
      </fieldset>

      {requestError && (
        <p className="text-sm text-destructive" role="alert">
          {requestError}
        </p>
      )}
      <button
        type="submit"
        disabled={isCreatingOrder}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {isCreatingOrder ? 'Conferindo pedido...' : 'Ir para pagamento'}
      </button>
    </form>
  );
};

export default CheckoutContactForm;