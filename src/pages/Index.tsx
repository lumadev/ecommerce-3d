import { CartProvider } from "@/features/cart/cart.provider";

import Navbar from "@/layout/navbar/Navbar";
import HeroSection from "@/layout/components/HeroSection";
import CategoriesSection from "@/features/product/components/CategoriesSection";
import CustomOrderSection from "@/features/custom-order/CustomOrderSection";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <CategoriesSection />
        <CustomOrderSection />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
