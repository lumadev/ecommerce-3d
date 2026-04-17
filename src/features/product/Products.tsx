import { CartProvider } from "@/features/cart/cart.provider";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/layout/navbar/Navbar";
import ProductGrid from "@/features/product/components/ProductGrid";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const Products = () => {
  const navigate = useNavigate();

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-display text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>
        <ProductGrid />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Products;
