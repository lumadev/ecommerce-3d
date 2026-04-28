import { useState } from "react";
import { toast } from "sonner";
import { imageUploadRepository } from "../repositories/imageUploadRepository";
import type { UseImageUploadOptions } from "./imageUpload.types";

interface UseImageUploadActionsOptions extends UseImageUploadOptions {
  onFinally?: () => void;
}

export function useImageUploadActions({
  picturePublicId,
  onUpload,
  onRemove,
  onFinally,
}: UseImageUploadActionsOptions) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setIsUploading(true);

    try {
      const result = await imageUploadRepository.upload(file);
      onUpload({
        url: result.url,
        picturePublicId: result.public_id,
      });

      toast.success("Imagem enviada com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      onFinally?.();
    }
  };

  const removeImage = async () => {
    setIsUploading(true);

    try {
      if (picturePublicId) {
        await imageUploadRepository.delete(picturePublicId);
      }

      onRemove();
      toast.success("Imagem removida com sucesso.");
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      toast.error("Não foi possível remover a imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      onFinally?.();
    }
  };

  return {
    isUploading,
    uploadImage,
    removeImage,
  };
}
