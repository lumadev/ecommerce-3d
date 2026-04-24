import { ArrowLeft, Package, Truck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";

import CartDrawer from "@/features/cart/components/CartDrawer";

import {
  mockOrders,
  Order,
  OrderStatusLabel,
  OrderStatusColor,
  OrderStatus,
} from "@/data/orders";

const statusSteps: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAYMENT_APPROVED",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
];

function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "CANCELED" || status === "PAYMENT_FAILED") return null;

  const currentIdx = statusSteps.indexOf(status);

  return (
    <div className="flex items-center gap-1 mt-4">
      {statusSteps.map((step, i) => {
        const reached = i <= currentIdx;
        return (
          <div key={step} className="flex items-center gap-1 flex-1">
            <div
              className={`h-2 w-full rounded-full transition-colors ${
                reached ? "bg-primary" : "bg-muted"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyTracking = () => {
    if (order.trackingCode) {
      navigator.clipboard.writeText(order.trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{order.id}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={`border text-xs ${OrderStatusColor[order.status]}`}
            >
              {OrderStatusLabel[order.status]}
            </Badge>
            <span className="text-sm font-bold text-primary">
              R$ {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        <OrderTimeline status={order.status} />
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-12 w-12 rounded-lg border border-border object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity}x — R$ {item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {order.trackingCode && (
                <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                  <Truck size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">
                    Rastreio:
                  </span>
                  <span className="text-xs font-mono text-foreground">
                    {order.trackingCode}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyTracking();
                    }}
                    className="ml-auto text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copiar código"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const MyOrdersContent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <CartDrawer />

      <div className="container mx-auto px-4 pt-8 pb-16 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Meus Pedidos
        </h1>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => <MyOrdersContent />;

export default MyOrders;
