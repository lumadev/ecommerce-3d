import { useRef, useState } from "react";
import { toast } from "sonner";
import { imageUploadRepository } from "../repositories/imageUploadRepository";

interface UploadResult {
  url: string;
  picturePublicId: string;
}

interface UseImageUploadOptions {
  picturePublicId?: string;
  onUpload: (result: UploadResult) => void;
  onRemove: () => void;
}

export function useImageUpload({
  picturePublicId,
  onUpload,
  onRemove,
}: UseImageUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsUploading(true);

    try {
      // remove imagem antiga antes de subir nova
      if (picturePublicId) {
        try {
          await imageUploadRepository.delete(picturePublicId);
        } catch (err) {
          console.warn("Erro ao remover imagem antiga:", err);
        }
      }

      const result = await imageUploadRepository.upload(file);
      onUpload({
        url: result.url,
        picturePublicId: result.public_id,
      });

      toast.success("Imagem enviada com sucesso.");
    } catch(e) {
      console.error("Erro ao enviar imagem:", e);
      toast.error("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    setIsUploading(true);

    try {
      if (picturePublicId) {
        await imageUploadRepository.delete(picturePublicId);
      }

      onRemove();
      toast.success("Imagem removida com sucesso.");
    } catch (e) {
      toast.error("Não foi possível remover a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return {
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    openFilePicker,
    isUploading,
  };
}
