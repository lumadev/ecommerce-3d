import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import CustomOrderSection from "@/components/CustomOrderSection";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

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
