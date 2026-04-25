import { categories } from "@/data/categories";

import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

import { ProductFormState } from "../types";
import { CategoriesSelect } from "./CategoriesSelect";
import { ImageUploadField } from "@/features/file";

type Category = {
  id: string;
  name: string;
};

interface Props {
  form: ProductFormState;
  onChange: (field: keyof ProductFormState, value: string | string[]) => void;
}

const ProductForm = ({ form, onChange }: Props) => {
  return (
    <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
      {/* IMAGE */}
      <ImageUploadField
        label="Foto do produto"
        value={form.image}
        onChange={(v) => onChange("image", v)}
      />

      {/* FIELDS */}
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          {/* NAME */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Ex: Vaso Geométrico"
              className="bg-background"
            />
          </div>

          {/* CATEGORIES */}
          <div className="grid gap-2">
            <CategoriesSelect
              categories={categories}
              value={form.categories}
              onChange={(cats) => onChange("categories", cats)}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Descrição
          </Label>
          <Textarea
            id="description"
            rows={6}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Descreva o produto..."
            className="min-h-[160px] resize-y bg-background"
          />
        </div>

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Preço (R$)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={form.price}
              onChange={(e) => onChange("price", e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock" className="text-sm font-medium">
              Estoque
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              placeholder="0"
              value={form.stock}
              onChange={(e) => onChange("stock", e.target.value)}
              className="bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;