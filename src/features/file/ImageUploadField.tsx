import { Upload, ImageOff, X } from "lucide-react";

import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button/button";
import { useImageUpload } from "./hooks/useImageUpload";

interface UploadedImageData {
  url: string;
  picturePublicId: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadComplete?: (data: UploadedImageData) => void;
  onRemove?: () => void;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  onUploadComplete,
  onRemove,
}: Props) {
  const {
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    openFilePicker,
    isUploading,
  } = useImageUpload({
    onUpload: (data) => {
      onChange(data.url);
      onUploadComplete?.(data);
    },
    onRemove: () => {
      onChange("");
      onRemove?.();
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium">{label}</Label>

      <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-background">
        {value ? (
          <>
            <img
              src={value}
              alt="Pré-visualização"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isUploading}
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
        onClick={openFilePicker}
        disabled={isUploading}
      >
        <Upload size={14} />
        {isUploading
          ? "Enviando..."
          : value
            ? "Trocar foto"
            : "Enviar foto"}
      </Button>

      <p className="text-xs text-muted-foreground">PNG ou JPG, até 5MB.</p>
    </div>
  );
}
