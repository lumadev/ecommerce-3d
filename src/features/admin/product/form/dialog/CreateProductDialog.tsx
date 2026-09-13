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
import { imageUploadRepository } from "@/features/file/repositories/imageUploadRepository";
import { ProductFormState } from "../../types/product-form.types";
import { Product, CreateProductData } from "../../types/product.types";
import ProductForm from "../ProductForm";
import { validateProductForm } from "../../helpers/product-form.helpers";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateProductData) => Promise<Product>;
}

const emptyForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  mediaPublicIds: [],
  categoryIds: [],
};

const CreateProductDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    try {
      if (form.mediaPublicIds.length) {
        await imageUploadRepository.delete(form.mediaPublicIds[0]);
      }
    } catch (error) {
      console.error("Erro ao remover imagem no cancelamento:", error);
    } finally {
      onClose();
      setForm(emptyForm);
    }
  };

  const onSaveCreate = async () => {
    const validatedForm = validateProductForm(form);
    if (!validatedForm) {
      return;
    }

    const newProduct: CreateProductData = {
      ...validatedForm,
    };

    try {
      setIsLoading(true);

      await onCreate(newProduct);

      toast.success(`Produto "${newProduct.name}" cadastrado com sucesso.`);
      onClose();
      setForm(emptyForm);
    } catch (error) {
      toast.error("Erro ao cadastrar produto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && void handleCancel()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[960px]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl">Novo Produto</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados e visualize a foto antes de confirmar o cadastro.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          form={form}
          onChange={(f, v) => setForm((s) => ({ ...s, [f]: v }))}
        />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={onSaveCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;