import { ArrowLeft } from 'lucide-react';
import type { CheckoutStep } from '../types/checkout-form.types';

interface CheckoutStepHeaderProps {
  step: Exclude<CheckoutStep, 'complete'>;
  isBackDisabled: boolean;
  onBack: () => void;
}

const CheckoutStepHeader = ({
  step,
  isBackDisabled,
  onBack,
}: CheckoutStepHeaderProps) => (
  <>
    <button
      type="button"
      onClick={onBack}
      disabled={isBackDisabled}
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft size={16} />
      {step === 'payment' ? 'Editar contato e entrega' : 'Voltar'}
    </button>

    <header className="mb-8 border-b border-border pb-5">
      <p className="text-xs font-semibold uppercase text-primary">Finalização segura</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-foreground">
        Finalizar pedido
      </h1>
      <div className="mt-5 flex max-w-lg items-center gap-3 text-sm">
        <span
          className={`font-semibold ${step === 'contact' ? 'text-primary' : 'text-foreground'}`}
        >
          1. Contato e entrega
        </span>
        <span className="h-px flex-1 bg-border" />
        <span
          className={`font-semibold ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}
        >
          2. Pagamento
        </span>
      </div>
    </header>
  </>
);

export default CheckoutStepHeader;