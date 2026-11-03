import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  categoryName?: string | null;
}

const ProductGrid = ({ products, isLoading, categoryName }: ProductGridProps) => {
  return (
    <section id="produtos" className="pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {categoryName ? (
              <>
                Produtos em{" "}
                <span className="text-gradient-primary">{categoryName}</span>
              </>
            ) : (
              <>
                Nossos <span className="text-gradient-primary">Produtos</span>
              </>
            )}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Cada peça é impressa com precisão e cuidado. Explore nosso catálogo e encontre algo especial.
          </p>
          {categoryName && (
            <Link
              to="/produtos"
              className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Limpar filtro
            </Link>
          )}
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
