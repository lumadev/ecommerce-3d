export interface CheckoutItemInput {
  productId: string;
  quantity: number;
  customNote?: string;
}

export interface ShippingAddressInput {
  recipient: string;
  postalCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface CreateCheckoutInput {
  checkoutKey: string;
  items: CheckoutItemInput[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressInput;
}

export interface CheckoutOrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  customNote?: string | null;
}

export interface CheckoutOrder {
  id: string;
  checkoutKey: string;
  subtotal: number;
  shippingAmount: number;
  total: number;
  status: string;
  paymentStatus: string;
  items: CheckoutOrderItem[];
}

export interface CheckoutStatus {
  id: string;
  checkoutKey: string;
  total: number;
  status: string;
  paymentStatus: string;
  paymentStatusDetail: string | null;
}

export interface PaymentConfig {
  publicKey: string | null;
  enabled: boolean;
}

export interface CardPaymentInput {
  token: string;
  payment_method_id: string;
  installments: number;
  issuer_id?: string;
}

export interface CardPaymentResult {
  id: string;
  checkoutKey: string;
  status: string;
  paymentStatus: string;
  paymentStatusDetail: string | null;
  total: number;
}