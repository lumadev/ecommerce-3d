import { useRef } from "react";
import { Upload, ImageOff, X } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button/button";

import { ProductFormState } from "../types";

interface Props {
  form: ProductFormState;
  onChange: (field: keyof ProductFormState, value: string) => void;
  onImageChange: (file: File) => void;
  onRemoveImage: () => void;
  showCategory?: boolean;
}

const ProductForm = ({
  form,
  onChange,
  onImageChange,
  onRemoveImage,
  showCategory = true,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageChange(file);
  };

  return (
    <div className="grid gap-5 py-2 md:grid-cols-[200px_1fr]">
      {/* Image */}
      <div className="flex flex-col gap-2">
        <Label>Foto do produto</Label>

        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-dashed border-border bg-muted/30">
          {form.image ? (
            <>
              <img
                src={form.image}
                alt="Pré-visualização"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={onRemoveImage}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1 backdrop-blur hover:bg-background"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff size={28} />
              <span className="text-xs">Sem imagem</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
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

      {/* Fields */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Ex: Vaso Geométrico"
          />
        </div>

        {showCategory && (
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              placeholder="Ex: Decoração"
            />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Descreva o produto..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => onChange("price", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock">Estoque</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => onChange("stock", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;