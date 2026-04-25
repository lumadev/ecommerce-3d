import { useRef } from "react";
import { toast } from "sonner";

interface UseImageUploadOptions {
  onUpload: (base64: string) => void;
  onRemove: () => void;
}

export function useImageUpload({ onUpload, onRemove }: UseImageUploadOptions) {
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
    reader.onload = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onRemove();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return { fileInputRef, handleImageChange, handleRemoveImage, openFilePicker };
}
