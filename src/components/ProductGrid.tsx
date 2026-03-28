import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section id="produtos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Nossos <span className="text-gradient-primary">Produtos</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Cada peça é impressa com precisão e cuidado. Explore nosso catálogo e encontre algo especial.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
