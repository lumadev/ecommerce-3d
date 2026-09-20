import HeroIndex from "@/features/hero/HeroIndex";
import CategoriesSection from "@/features/product/components/CategoriesSection";
import CustomOrderSection from "@/features/custom-order/CustomOrderSection";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
        <HeroIndex />
        {/* <CategoriesSection /> */}
        <CustomOrderSection />
        <Footer />
        <CartDrawer />
      </div>
  );
};

export default Index;
