import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { CategoryFormState } from "@/features/admin/category/types/category-form.types";
import { CreateCategoryData } from "../types/category.types";

import CategoryForm from "./CategoryForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (category: CreateCategoryData) => Promise<void>;
}

const emptyForm: CategoryFormState = {
  name: "",
  description: "",
  url: "",
  picturePublicId: "",
  hashtags: [],
};

const CreateCategoryDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<CategoryFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }

    if (!form.picturePublicId) {
      toast.error("Adicione uma foto da categoria.");
      return;
    }

    const newCategory: CreateCategoryData = {
      name: form.name.trim(),
      description: form.description.trim(),
      picturePublicId: form.picturePublicId,
      hashtags: form.hashtags,
    };

    try {
      setIsLoading(true);

      await onCreate(newCategory);

      toast.success(`Categoria "${newCategory.name}" cadastrada com sucesso.`);
      onClose();
      setForm(emptyForm);
    } catch (error) {
      toast.error("Erro ao cadastrar categoria.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[820px]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl">Nova Categoria</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados e visualize a foto antes de confirmar.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          form={form}
          onChange={(field, value) =>
            setForm((f) => ({ ...f, [field]: value }))
          }
        />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>

          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Salvando..." : "Confirmar Cadastro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;