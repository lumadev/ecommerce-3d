export interface Merchant {
  id: string;
  code: string;
  name: string;
  email: string | null;
  domain: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMerchantData {
  code: string;
  name: string;
  email?: string;
  domain?: string;
  isActive?: boolean;
}

export interface UpdateMerchantData {
  name?: string;
  email?: string;
  domain?: string;
  isActive?: boolean;
}
