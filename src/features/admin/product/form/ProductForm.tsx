import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

import { ProductFormState } from "../types/product-form.types";
import { CategoriesSelect } from "./CategoriesSelect";
import ProductImageUploadField from "./ProductImageUploadField";
import { useProductCategories } from "../hooks/useProductCategories";

interface Props {
  form: ProductFormState;
  onChange: (field: keyof ProductFormState, value: string | string[]) => void;
}

const ProductForm = ({ form, onChange }: Props) => {
  const { categories, isLoading, hasError: hasErrorCategories } = useProductCategories();

  return (
    <div className="grid items-start gap-6 py-2 md:grid-cols-[280px_minmax(0,1fr)]">
      {/* IMAGE */}
      <ProductImageUploadField
        label="Foto do produto"
        value={form.image ?? ""}
        picturePublicId={form.mediaPublicIds[0]}
        name={form.name}
        description={form.description}
        price={form.price}
        categories={
          categories
            ?.filter((category) => form.categoryIds.includes(category.id))
            .map((category) => category.name) ?? []
        }
        onChange={(v) => onChange("image", v)}
        onUploadComplete={(data) => onChange("mediaPublicIds", [data.picturePublicId])}
        onRemove={() => onChange("mediaPublicIds", [])}
      />

      {/* FIELDS */}
      <div className="grid content-start gap-4">
        <div className="grid grid-cols-2 items-start gap-4">
          {/* NAME */}
          <div className="grid content-start gap-2">
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
          <div className="grid content-start gap-2">
            {categories?.length > 0 && (
              <CategoriesSelect
                categories={categories}
                isLoading={isLoading}
                hasError={hasErrorCategories}
                value={form.categoryIds}
                onChange={(cats) => onChange("categoryIds", cats)}
              />
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="grid content-start gap-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Descrição
          </Label>
          <Textarea
            id="description"
            rows={10}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Descreva o produto..."
            className="min-h-[260px] resize-y bg-background"
          />
        </div>

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="grid content-start gap-2">
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

          <div className="grid content-start gap-2">
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