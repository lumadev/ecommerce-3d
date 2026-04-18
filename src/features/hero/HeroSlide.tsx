import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

const HeroSlide = ({ product, isActive, onAdd }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={`absolute inset-0 ${
        isActive ? "pointer-events-auto z-10" : "pointer-events-none z-0"
      }`}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.05,
      }}
      transition={{ duration: 0.7 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 font-display text-xs uppercase tracking-wider text-primary">
          {product.categories.join(" • ")}
        </span>
        <h3 className="mb-1 font-display text-xl font-bold text-foreground">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/produto/${product.id}`)}
              className="flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/10"
            >
              <Eye className="h-4 w-4" />
              Visualizar
            </button>
            <button
              onClick={onAdd}
              className="flex items-center gap-2 rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              Adicionar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSlide;