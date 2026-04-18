import { motion } from "framer-motion";
import { products } from "@/data/products";
import HeroContent from "./HeroContent";
import HeroCarousel from "./HeroCarousel";

const featuredProducts = products.slice(0, 4);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 container mx-auto flex min-h-screen items-center px-4 py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <HeroContent />
          <HeroCarousel products={featuredProducts} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-8 w-5 rounded-full border-2 border-primary/40 flex items-start justify-center pt-1"
        >
          <div className="h-2 w-1 rounded-full bg-primary animate-pulse-glow" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;