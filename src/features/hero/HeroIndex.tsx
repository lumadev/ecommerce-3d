import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Product } from "@/data/products";
import { useHighlights } from "@/features/admin/highlight/hooks/useHighlights";
import HeroContent from "./HeroContent";
import HeroCarousel from "./HeroCarousel";
import HeroCarouselSkeleton from "./HeroCarouselSkeleton";
import { toProductMedia } from "@/features/product/mappers/toProduct";

const HeroSection = () => {
  const { highlightList, isLoading } = useHighlights();
  const featuredProducts = highlightList.map(({ product }): Product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: toProductMedia(product)[0]?.src ?? "",
    media: toProductMedia(product),
    categories: [],
    customizable: false,
  }));

  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 container mx-auto flex min-h-[calc(100svh-4rem)] items-start px-6 py-12 sm:px-8 sm:py-16 lg:items-center lg:px-10 lg:py-20">
        <div className={`grid w-full items-center gap-10 ${isLoading || featuredProducts.length > 0 ? "lg:grid-cols-2" : "lg:grid-cols-1"} lg:items-start lg:gap-16 xl:gap-20`}>
          <HeroContent />
          {isLoading ? (
            <HeroCarouselSkeleton />
          ) : (
            featuredProducts.length > 0 && (
              <HeroCarousel products={featuredProducts} />
            )
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown className="h-6 w-6 text-primary/70" />
          <ChevronDown className="-mt-4 h-6 w-6 text-primary/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;