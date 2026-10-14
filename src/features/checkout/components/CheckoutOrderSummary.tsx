import { ShieldCheck } from 'lucide-react';
import type { CheckoutOrderItem } from '../types/checkout.types';

interface CheckoutOrderSummaryProps {
  items: CheckoutOrderItem[];
  total: number;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

const CheckoutOrderSummary = ({ items, total }: CheckoutOrderSummaryProps) => (
  <aside className="h-fit border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
    <h2 className="font-display text-base font-semibold text-foreground">Resumo do pedido</h2>
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={item.productId} className="flex justify-between gap-3 text-sm">
          <span className="text-muted-foreground">
            {item.quantity} × {item.name}
            {item.customNote && (
              <span className="block text-xs">Personalização: {item.customNote}</span>
            )}
          </span>
          <span className="whitespace-nowrap text-foreground">
            {formatCurrency(item.unitPrice * item.quantity)}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
      <span className="text-sm font-semibold text-foreground">Total dos produtos</span>
      <span className="font-display text-lg font-bold text-foreground">
        {formatCurrency(total)}
      </span>
    </div>
    <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
      <p>
        Pagamento processado pelo Mercado Pago. Os dados completos do cartão não são armazenados
        pela loja.
      </p>
    </div>
  </aside>
);

export default CheckoutOrderSummary;