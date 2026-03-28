import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-gradient-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.customizable && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Sparkles size={12} />
            Personalizável
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
          {product.category}
        </p>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/produto/${product.id}`)}
              className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-sm font-semibold text-primary transition-all hover:border-primary hover:shadow-glow"
            >
              <Eye size={16} />
              Visualizar
            </button>
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-cta px-3 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
