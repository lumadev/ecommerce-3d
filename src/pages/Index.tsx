import HeroSection from "@/features/hero/HeroSection";
import CategoriesSection from "@/features/product/components/CategoriesSection";
import CustomOrderSection from "@/features/custom-order/CustomOrderSection";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
        <HeroSection />
        <CategoriesSection />
        <CustomOrderSection />
        <Footer />
        <CartDrawer />
      </div>
  );
};

export default Index;
