import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

interface ProductGridPreviewProps {
  products: Product[];
  isLoading?: boolean;
  /** Quantidade máxima de produtos exibidos na prévia. */
  limit: number;
  /** Rota do catálogo completo, usada pelo botão "Ver mais". */
  viewAllHref: string;
}

/**
 * Versão reduzida do ProductGrid usada na Home: mostra apenas os primeiros
 * `limit` produtos e um botão "Ver mais" para o catálogo completo.
 */
const ProductGridPreview = ({ products, isLoading, limit, viewAllHref }: ProductGridPreviewProps) => {
  const visibleProducts = products.slice(0, limit);
  const showViewAll = products.length > visibleProducts.length;

  return (
    <section id="produtos-destaque" className="pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Nossos <span className="text-gradient-primary">Produtos</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Cada peça é impressa com precisão e cuidado. Explore nosso catálogo e encontre algo especial.
          </p>
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum produto encontrado.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {showViewAll && (
              <div className="mt-10 flex justify-center">
                <Link
                  to={viewAllHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-cta px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
                >
                  Ver mais
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGridPreview;
