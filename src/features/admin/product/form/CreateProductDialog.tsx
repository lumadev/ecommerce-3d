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
import { AdminProduct, ProductFormState } from "../types";
import ProductForm from "./ProductForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (product: AdminProduct) => void;
}

const emptyForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categories: [],
};

const CreateProductDialog = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState(emptyForm);

  const handleCreate = () => {
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock);

    if (!form.name || !form.categories.length || isNaN(price) || isNaN(stock)) {
      toast.error("Preencha corretamente o formulário");
      return;
    }

    const newProduct: AdminProduct = {
      id: `new-${Date.now()}`,
      name: form.name,
      description: form.description,
      price,
      stock,
      categories: form.categories,
      image: "",
      customizable: false,
    };

    onCreate(newProduct);
    onClose();
    setForm(emptyForm);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[890px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os dados e visualize a foto antes de confirmar o cadastro.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          form={form}
          onChange={(f, v) => setForm((s) => ({ ...s, [f]: v }))}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;