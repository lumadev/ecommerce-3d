import { PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutEmptyState = () => (
  <main className="min-h-[70vh] bg-background px-4 pb-16 pt-28">
    <div className="mx-auto max-w-xl text-center">
      <PackageCheck className="mx-auto mb-4 text-muted-foreground" size={32} />
      <h1 className="font-display text-2xl font-bold text-foreground">
        Seu carrinho está vazio
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Adicione produtos antes de iniciar o checkout.
      </p>
      <Link
        className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
        to="/produtos"
      >
        Ver produtos
      </Link>
    </div>
  </main>
);

export default CheckoutEmptyState;