import { useEffect, useState } from "react";
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
import { Category } from "@/data/categories";
import { CategoryFormState } from "@/features/admin/category/types/category-form.types";
import { UpdateCategoryData } from "@/features/admin/category/types/category.types";

import CategoryForm from "./CategoryForm";

interface Props {
  category: Category | null;
  onClose: () => void;
  onSave: (id: string, category: UpdateCategoryData) => Promise<unknown> | void;
}

const emptyForm: CategoryFormState = {
  name: "",
  description: "",
  url: "",
  picturePublicId: "",
  hashtags: [],
};

const toFormState = (c: Category | null): CategoryFormState => ({
  name: c?.name ?? "",
  description: c?.description ?? "",
  picturePublicId: c?.picturePublicId ?? "",
  url: c?.url ?? "",
  hashtags: c?.hashtags ?? [],
});

const EditCategoryDialog = ({ category, onClose, onSave }: Props) => {
  const [form, setForm] = useState<CategoryFormState>(() => toFormState(category));

  useEffect(() => {
    setForm(toFormState(category));
  }, [category]);

  const handleSave = async () => {
    if (!category) return;

    if (!form.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }

    if (!form.picturePublicId) {
      toast.error("Adicione uma foto da categoria.");
      return;
    }

    try {
      await onSave(category.id, {
        name: form.name.trim(),
        description: form.description.trim(),
        picturePublicId: form.picturePublicId,
        hashtags: form.hashtags,
      });

      onClose();
      setForm(emptyForm);
    } catch {
      // Errors are handled by the hook responsible for persistence.
    }
  };

  return (
    <Dialog open={!!category} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[820px]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl">Editar Categoria</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Altere os dados e a foto da categoria.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          form={form}
          onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
        />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
