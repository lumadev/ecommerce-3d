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
import { ProductFormState } from "../types/product-form.types";

import { Product, CreateProductData } from "../types/product.types";

import ProductForm from "./ProductForm";

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
  categoryIds: [],
};

const CreateProductDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      toast.error("Informe o nome do produto.");
      return;
    }

    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Informe um preço válido.");
      return;
    }

    const stock = parseInt(form.stock);
    if (isNaN(stock) || stock < 0) {
      toast.error("Informe um estoque válido.");
      return;
    }

    if (!form.categoryIds.length) {
      toast.error("Selecione ao menos uma categoria.");
      return;
    }

    const newProduct: CreateProductData = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      stock,
      categoryIds: form.categoryIds,
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[890px]">
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
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;