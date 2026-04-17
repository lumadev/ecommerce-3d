import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { toast } from "sonner";
import { AdminProduct, ProductFormState } from "../types";
import ProductForm from "./ProductForm";

interface Props {
  product: AdminProduct | null;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
}

const EditProductDialog = ({ product, onClose, onSave }: Props) => {
  const [form, setForm] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
    }
  }, [product]);

  const handleSave = () => {
    if (!product) return;

    const price = parseFloat(form.price);
    const stock = parseInt(form.stock);

    if (isNaN(price) || isNaN(stock)) {
      toast.error("Dados inválidos");
      return;
    }

    onSave({
      ...product,
      name: form.name,
      description: form.description,
      price,
      stock,
    });

    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>

        <ProductForm form={form} onChange={(f, v) => setForm((s) => ({ ...s, [f]: v }))} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;