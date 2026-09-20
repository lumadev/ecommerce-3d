import { CartProvider } from "@/features/cart/cart.provider";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "@/features/product/components/ProductGrid";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";
import { useProducts } from "@/features/product/hooks/useProducts";

const Products = () => {
  const navigate = useNavigate();
  const { productList, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 pt-6 pb-2">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-display text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>
        <ProductGrid products={productList} isLoading={isLoading} />
        <Footer />
        <CartDrawer />
      </div>
  );
};

export default Products;
