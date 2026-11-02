import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  Package,
  Ruler,
  Layers,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartContext as useCart } from "@/features/cart/useCart";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";
import MediaCarousel from "./MediaCarousel";
import ProductNotFound from "./ProductNotFound";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { useProduct } from "@/features/product/hooks/useProduct";
import { useProducts } from "@/features/product/hooks/useProducts";
import { ProductDetailsLocationState } from "./productDetailsLocationState";
import RelatedProducts from "./RelatedProducts";

const ProductDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { productList } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setActiveMedia(0);
  }, [id]);

  const cachedProduct = (location.state as ProductDetailsLocationState | null)
    ?.product;
  const { product, isLoading } = useProduct(id, cachedProduct);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const currentProductIndex = productList.findIndex(
    (item) => item.id === product.id,
  );
  const nextProduct =
    productList.length > 1
      ? productList[
          (currentProductIndex >= 0 ? currentProductIndex + 1 : 0) %
            productList.length
        ]
      : undefined;
  const relatedProducts = productList
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categories.some((category) =>
          product.categories.some(
            (productCategory) =>
              productCategory.toLocaleLowerCase() ===
              category.toLocaleLowerCase(),
          ),
        ),
    )
    .slice(0, 4);

  const goToProduct = (productId: string, selectedProduct: typeof product) => {
    navigate(`/produto/${productId}`, {
      state: { product: selectedProduct } satisfies ProductDetailsLocationState,
    });
  };

  const quantityInCart =
    items.find((item) => item.product.id === product.id)?.quantity ?? 0;
  const availableStock =
    product.stock === undefined
      ? undefined
      : Math.max(0, product.stock - quantityInCart);
  const isOutOfStock = availableStock === 0;
  const quantityToAdd = Math.min(quantity, availableStock ?? quantity);

  const handleAddToCart = () => {
    for (let i = 0; i < quantityToAdd; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 pt-12 pb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/produtos")}
            className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-primary/30 px-4 font-display text-sm font-medium leading-none text-primary transition-all hover:border-primary hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          {nextProduct && (
            <button
              onClick={() => goToProduct(nextProduct.id, nextProduct)}
              className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-primary/30 px-4 font-display text-sm font-medium leading-none text-primary transition-all hover:border-primary hover:shadow-glow"
            >
              Próximo produto
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <section className="py-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-8">
            {/* Media Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex w-full max-w-[26rem] flex-col gap-2 lg:mx-0"
            >
              <MediaCarousel
                media={product.media && product.media.length > 0 ? product.media : [{ type: "image", src: product.image, alt: product.name }]}
                activeIndex={activeMedia}
                onChange={setActiveMedia}
                productName={product.name}
                customizable={product.customizable}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-start"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {product.size && (
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                    <Ruler size={18} className="text-primary" />
                    Tamanho
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-sm font-semibold text-primary">
                    {product.size}
                  </span>
                </div>
              )}

              {/* Specs */}
              {/* <div className="mb-8 grid grid-cols-3 gap-4">
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
              </div> */}

              {/* Price & Add */}
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-2.5 py-1.5 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center font-display text-base font-bold text-foreground">
                      {quantityToAdd}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(availableStock ?? Infinity, q + 1)
                        )
                      }
                      disabled={
                        availableStock !== undefined &&
                        quantity >= availableStock
                      }
                      className="px-2.5 py-1.5 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-cta px-3 py-2 font-display text-xs font-semibold text-primary-foreground transition-all hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm lg:w-56 lg:flex-none"
                  >
                    <ShoppingCart size={18} />
                    {isOutOfStock
                      ? "Sem estoque disponível"
                      : "Adicionar ao Carrinho"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RelatedProducts products={relatedProducts} />
      <Footer />
      <CartDrawer />
    </div>
  );
};

const ProdutoDetalhe = () => <ProductDetailContent />;

export default ProdutoDetalhe;
