import { motion } from "framer-motion";
import { useCartContext as useCart } from "@/features/cart/useCart";
import { useHeroCarousel } from "./useHeroCarousel";
import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDots from "./HeroDots";
import HeroThumbnails from "./HeroThumbnails";

const HeroCarousel = ({ products }) => {
  const { addItem } = useCart();
  const { activeIndex, setActiveIndex, next, prev } =
    useHeroCarousel(products.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-glow aspect-[4/3]">
        {products.map((product, index) => (
          <HeroSlide
            key={product.id}
            product={product}
            isActive={index === activeIndex}
            onAdd={() => addItem(product)}
          />
        ))}

        <HeroControls onNext={next} onPrev={prev} />
      </div>

      <HeroDots
        total={products.length}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />

      <HeroThumbnails
        products={products}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </motion.div>
  );
};

export default HeroCarousel;