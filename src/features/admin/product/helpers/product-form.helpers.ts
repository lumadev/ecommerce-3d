import { ProductFormState } from "../types/product-form.types";

export interface ValidatedProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  mediaPublicIds: string[];
  categoryIds: string[];
}

export const validateProductForm = (
  form: ProductFormState,
  notify: (description: string) => void,
): ValidatedProductForm | null => {
  const name = form.name.trim();
  if (!name) {
    notify("Informe o nome do produto.");
    return null;
  }

  const price = parseFloat(form.price);
  if (isNaN(price) || price <= 0) {
    notify("Informe um preço válido.");
    return null;
  }

  const stock = parseInt(form.stock, 10);
  if (isNaN(stock) || stock < 0) {
    notify("Informe um estoque válido.");
    return null;
  }

  if (!form.categoryIds.length) {
    notify("Selecione ao menos uma categoria.");
    return null;
  }

  return {
    name,
    description: form.description.trim(),
    price,
    stock,
    mediaPublicIds: form.mediaPublicIds,
    categoryIds: form.categoryIds,
  };
};
