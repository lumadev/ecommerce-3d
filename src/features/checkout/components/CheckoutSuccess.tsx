import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CheckoutSuccessProps {
  orderId?: string;
  total: string;
}

const CheckoutSuccess = ({ orderId, total }: CheckoutSuccessProps) => (
  <section className="mx-auto max-w-xl border-t-2 border-primary py-8">
    <ShieldCheck className="mb-4 text-primary" size={34} />
    <h1 className="font-display text-2xl font-bold text-foreground">
      Pedido confirmado
    </h1>
    <p className="mt-2 text-sm text-muted-foreground">
      Pagamento aprovado. Guarde o número do pedido para consultar o atendimento.
    </p>
    {orderId && <p className="mt-4 text-sm text-foreground">Pedido: {orderId}</p>}
    <p className="mt-1 text-sm font-semibold text-foreground">Total: {total}</p>
    <Link
      className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
      to="/produtos"
    >
      Continuar comprando
    </Link>
  </section>
);

export default CheckoutSuccess;