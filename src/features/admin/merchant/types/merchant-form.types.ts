export interface MerchantFormState {
  code: string;
  name: string;
  email: string;
  domain: string;
  isActive: boolean;
}

export type MerchantFormErrors = Partial<Record<keyof MerchantFormState, string>>;
