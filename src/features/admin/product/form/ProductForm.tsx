import { useRef } from "react";
import { Upload, ImageOff, X } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/data/categories";

import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button/button";

import { ProductFormState } from "../types";
import { CategoriesSelect } from "./CategoriesSelect";

type Category = {
  id: string;
  name: string;
};

interface Props {
  form: ProductFormState;
  onChange: (field: keyof ProductFormState, value: string | string[]) => void;
}

const ProductForm = ({ form, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onChange("image", reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange("image", "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
      {/* IMAGE */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium">Foto do produto</Label>

        <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-background">
          {form.image ? (
            <>
              <img
                src={form.image}
                alt="Pré-visualização"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-md backdrop-blur hover:bg-background"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff size={32} />
              <span className="text-xs">Sem imagem</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={14} />
          {form.image ? "Trocar foto" : "Enviar foto"}
        </Button>

        <p className="text-xs text-muted-foreground">
          PNG ou JPG, até 5MB.
        </p>
      </div>

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