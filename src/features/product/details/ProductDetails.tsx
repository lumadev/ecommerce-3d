import { ArrowLeft, ShoppingCart, Sparkles, Package, Ruler, Layers } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCartContext as useCart } from "@/features/cart/useCart";
import { motion } from "framer-motion";
import { useState } from "react";

import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const ProductDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 pt-12 text-center">
          <p className="text-xl text-muted-foreground">Produto não encontrado.</p>
          <button
            onClick={() => navigate("/produtos")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-display text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Produtos
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 pt-12 pb-4">
        <button
          onClick={() => navigate("/produtos")}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-display text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
      </div>

      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.customizable && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary/90 px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                  <Sparkles size={14} />
                  Personalizável
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                {product.category}
              </p>
              <h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
                  <Package size={20} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Material</span>
                  <span className="text-sm font-semibold text-foreground">PLA/PETG</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
                  <Ruler size={20} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Resolução</span>
                  <span className="text-sm font-semibold text-foreground">0.2mm</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
                  <Layers size={20} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Acabamento</span>
                  <span className="text-sm font-semibold text-foreground">Premium</span>
                </div>
              </div>

              {/* Price & Add */}
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-primary">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      −
                    </button>
                    <span className="min-w-[2.5rem] text-center font-display text-lg font-bold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-cta px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
                  >
                    <ShoppingCart size={18} />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

const ProdutoDetalhe = () => <ProductDetailContent />;

export default ProdutoDetalhe;
