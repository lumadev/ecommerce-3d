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
import { Category } from "@/data/categories";
import { CategoryFormState } from "@/features/admin/category/types/category-form.types";
import CategoryForm from "./CategoryForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (category: Category) => void;
}

const emptyForm: CategoryFormState = { name: "", description: "", image: "", hashtags: [] };

const CreateCategoryDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<CategoryFormState>(emptyForm);

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast.error("Informe o nome da categoria.");
      return;
    }
    if (!form.image) {
      toast.error("Adicione uma foto da categoria.");
      return;
    }
    const newCategory: Category = {
      id: `new-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image,
      hashtags: form.hashtags,
    };
    onCreate(newCategory);
    toast.success(`Categoria "${newCategory.name}" cadastrada com sucesso.`);
    
    onClose();
    setForm(emptyForm);
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
          onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
        />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>
            Confirmar Cadastro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
