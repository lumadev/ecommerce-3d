import HeroIndex from "@/features/hero/HeroIndex";
import ProductGridPreview from "@/features/product/components/ProductGridPreview";
import { useProducts } from "@/features/product/hooks/useProducts";
import CategoriesSection from "@/features/product/components/CategoriesSection";
import { useCategoriesSection } from "@/features/product/hooks/useCategoriesSection";
import CustomOrderSection from "@/features/contact/CustomOrderSection";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Footer from "@/layout/components/Footer";

const Index = () => {
  const { productList, isLoading } = useProducts();
  const { categories } = useCategoriesSection();

  return (
    <div className="min-h-screen bg-background pt-16">
        <HeroIndex />
        <CategoriesSection categories={categories} />
        <ProductGridPreview
          products={productList}
          isLoading={isLoading}
          limit={6}
          viewAllHref="/produtos"
        />
        <CustomOrderSection />
        <Footer />
        <CartDrawer />
      </div>
  );
};

export default Index;
