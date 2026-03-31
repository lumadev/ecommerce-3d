export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_APPROVED'
  | 'PAYMENT_FAILED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELED';

export const OrderStatusLabel: Record<OrderStatus, string> = {
  PENDING_PAYMENT: 'Aguardando pagamento',
  PAYMENT_APPROVED: 'Pagamento aprovado',
  PAYMENT_FAILED: 'Pagamento recusado',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
};

export const OrderStatusColor: Record<OrderStatus, string> = {
  PENDING_PAYMENT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  PAYMENT_APPROVED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  PAYMENT_FAILED: 'bg-destructive/20 text-red-400 border-destructive/30',
  SHIPPED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DELIVERED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  CANCELED: 'bg-muted text-muted-foreground border-border',
};

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  trackingCode?: string;
}

// Mock data
import productVaso from '@/assets/product-vaso.jpg';
import productLuminaria from '@/assets/product-luminaria.jpg';
import productSuporte from '@/assets/product-suporte.jpg';

export const mockOrders: Order[] = [
  {
    id: 'PED-20250328-001',
    date: '2025-03-28',
    status: 'SHIPPED',
    trackingCode: 'BR123456789XX',
    items: [
      { productName: 'Vaso Geométrico', quantity: 2, unitPrice: 49.9, image: productVaso },
      { productName: 'Luminária Lua', quantity: 1, unitPrice: 89.9, image: productLuminaria },
    ],
    total: 189.7,
  },
  {
    id: 'PED-20250325-002',
    date: '2025-03-25',
    status: 'DELIVERED',
    items: [
      { productName: 'Suporte para Fone', quantity: 1, unitPrice: 39.9, image: productSuporte },
    ],
    total: 39.9,
  },
  {
    id: 'PED-20250330-003',
    date: '2025-03-30',
    status: 'PENDING_PAYMENT',
    items: [
      { productName: 'Vaso Geométrico', quantity: 1, unitPrice: 49.9, image: productVaso },
    ],
    total: 49.9,
  },
];
