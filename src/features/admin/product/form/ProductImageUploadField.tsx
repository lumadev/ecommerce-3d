import { Eye, ImageOff, Loader2, ShoppingCart, Upload, X } from "lucide-react";

import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button/button";
import { useImageUpload } from "@/features/file/hooks/useImageUpload";

interface UploadedImageData {
  url: string;
  picturePublicId: string;
}

interface Props {
  label: string;
  value: string;
  picturePublicId?: string;
  name: string;
  description: string;
  price: string;
  categories: string[];
  onChange: (value: string) => void;
  onUploadComplete?: (data: UploadedImageData) => void;
  onRemove?: () => void;
}

const ProductImageUploadField = ({
  label,
  value,
  picturePublicId,
  name,
  description,
  price,
  categories,
  onChange,
  onUploadComplete,
  onRemove,
}: Props) => {
  const uploadConfig = {
    picturePublicId,
    folder: "products" as const,
    onUpload: (data: UploadedImageData) => {
      onChange(data.url);
      onUploadComplete?.(data);
    },
    onRemove: () => {
      onChange("");
      onRemove?.();
    },
  };

  const {
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    openFilePicker,
    isUploading,
  } = useImageUpload(uploadConfig);

  const displayName = name.trim() || "Novo produto";
  const displayDescription =
    description.trim() || "Descreva este produto para visualizar como ele aparece na vitrine.";
  const displayPrice = Number.parseFloat(price);
  const formattedPrice = Number.isFinite(displayPrice)
    ? displayPrice.toFixed(2).replace(".", ",")
    : "0,00";
  const displayCategories = categories.filter(Boolean);

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium">{label}</Label>

      <div className="group relative overflow-hidden rounded-xl border border-border bg-gradient-card">
        <div className="aspect-square overflow-hidden">
          {value ? (
            <img
              src={value}
              alt="Pré-visualização do produto"
              className={`h-full w-full object-cover transition-all duration-500 ${
                isUploading ? "scale-[1.01] opacity-40 blur-[1px]" : "opacity-100"
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-background text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <ImageOff className="h-9 w-9" />
                <span className="text-xs">Sem imagem</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-background/95 p-4">
          <p className="mb-1 line-clamp-1 text-xs font-medium uppercase tracking-wider text-primary">
            {displayCategories.length ? displayCategories.join(" • ") : "Categoria"}
          </p>
          <h3 className="mb-1 line-clamp-1 font-display text-lg font-semibold text-foreground">
            {displayName}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {displayDescription}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-xl font-bold text-primary">
              R$ {formattedPrice}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-2 text-sm font-semibold text-primary">
                <Eye size={16} />
                Visualizar
              </span>
              <span className="flex items-center rounded-lg bg-gradient-cta p-2 text-primary-foreground">
                <ShoppingCart size={16} />
              </span>
            </div>
          </div>
        </div>

        {value && (
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="absolute right-2 top-2 rounded-full bg-background/85 p-1.5 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
            aria-label="Remover imagem"
          >
            <X size={14} />
          </button>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/35">
            <div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
              <Loader2 size={14} className="animate-spin" />
              Enviando imagem...
            </div>
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
        onClick={openFilePicker}
        disabled={isUploading}
      >
        <Upload size={14} />
        {isUploading ? "Enviando..." : value ? "Trocar foto" : "Enviar foto"}
      </Button>

      <p className="text-xs text-muted-foreground">PNG ou JPG, até 5MB.</p>
    </div>
  );
};

export default ProductImageUploadField;