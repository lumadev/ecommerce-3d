import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="font-display text-lg font-bold text-foreground">Carrinho</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Seu carrinho está vazio
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 rounded-lg border border-border bg-secondary/50 p-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                          width={80}
                          height={80}
                          loading="lazy"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">
                              {item.product.name}
                            </h4>
                            <p className="text-sm font-medium text-primary">
                              R$ {item.product.price.toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="ml-auto flex h-7 w-7 items-center justify-center rounded text-destructive/70 hover:text-destructive transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border px-6 py-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-display text-xl font-bold text-primary">
                      R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <button className="mb-2 w-full rounded-lg bg-gradient-cta py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow-strong hover:scale-[1.02]">
                    Finalizar Pedido
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full rounded-lg border border-border py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
