import { useRef } from "react";
import { Upload, ImageOff, X } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button/button";

export interface CategoryFormState {
  name: string;
  description: string;
  image: string;
}

interface Props {
  form: CategoryFormState;
  onChange: (field: keyof CategoryFormState, value: string) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
}

const CategoryForm = ({
  form,
  onChange,
  namePlaceholder = "Ex: Decoração",
  descriptionPlaceholder = "Descreva o tipo de produtos que pertencem a esta categoria...",
}: Props) => {
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
    reader.onload = () => onChange("image", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="grid gap-6 py-2 md:grid-cols-[240px_1fr]">
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium">Foto da categoria</Label>

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
                className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
                aria-label="Remover imagem"
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

        <p className="text-xs text-muted-foreground">PNG ou JPG, até 5MB.</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cat-name" className="text-sm font-medium">
            Nome
          </Label>
          <Input
            id="cat-name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder={namePlaceholder}
            className="bg-background"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cat-description" className="text-sm font-medium">
            Descrição
          </Label>
          <Textarea
            id="cat-description"
            rows={6}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder={descriptionPlaceholder}
            className="min-h-[160px] resize-y bg-background"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
