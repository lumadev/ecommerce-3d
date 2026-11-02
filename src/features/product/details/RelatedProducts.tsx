import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { ProductDetailsLocationState } from "./productDetailsLocationState";

interface RelatedProductsProps {
  products: Product[];
}

const getProductImage = (product: Product) => {
  const firstMedia = product.media?.[0];

  if (firstMedia?.type === "video") {
    return firstMedia.poster ?? product.image;
  }

  return firstMedia?.src ?? product.image;
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Você também pode gostar
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/produto/${product.id}`}
              state={{ product } satisfies ProductDetailsLocationState}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 font-display text-sm font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
