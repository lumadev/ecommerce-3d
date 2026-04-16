import { useState } from "react";

import {
  mockOrders,
  Order,
  OrderStatus,
  OrderStatusLabel,
} from "@/data/orders";
import { toast } from "sonner";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    const now = new Date().toISOString();

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusHistory: [...order.statusHistory, { status: newStatus, date: now }],
            }
          : order
      )
    );

    toast.success(
      `Pedido ${orderId} atualizado para "${OrderStatusLabel[newStatus]}"`
    );
  };

  return {
    orders,
    updateStatus,
  };
};