import type { ShippingAddressInput } from './checkout.types';

export type CheckoutStep = 'contact' | 'payment' | 'complete';
export type CheckoutField =
  | 'customerName'
  | 'customerEmail'
  | 'customerPhone'
  | keyof ShippingAddressInput;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export interface CheckoutForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddressInput;
}