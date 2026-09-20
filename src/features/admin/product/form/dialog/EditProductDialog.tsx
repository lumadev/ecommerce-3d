import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductListItem, UpdateProductData } from "../../types/product.types";
import { ProductFormState } from "../../types/product-form.types";
import ProductForm from "../ProductForm";
import { validateProductForm } from "../../helpers/product-form.helpers";

interface Props {
  product: ProductListItem | null;
  onClose: () => void;
  onSave: (id: string, data: UpdateProductData) => Promise<ProductListItem>;
}

const toFormState = (p: ProductListItem | null): ProductFormState => ({
  name: p?.name ?? "",
  description: p?.description ?? "",
  price: p?.price != null ? p.price.toString() : "",
  stock: p?.stock != null ? p.stock.toString() : "",
  image: p?.mediaUrls?.[0] ?? "",
  mediaPublicIds: [],
  categoryIds: p?.categories ? p.categories.map((c) => c.id) : [],
});

const EditProductDialog = ({ product, onClose, onSave }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState<ProductFormState>(() => toFormState(product));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForm(toFormState(product));
  }, [product]);

  const onSaveEdit = async () => {
    if (!product) return;

    const validatedForm = validateProductForm(form, (description) =>
      toast({ description }),
    );
    if (!validatedForm) {
      return;
    }

    const updateData: UpdateProductData = {
      ...validatedForm,
    };

    try {
      setIsLoading(true);
      await onSave(product.id, updateData);
      onClose();
    } catch {
      // toast error is handled inside useProducts hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card text-card-foreground sm:max-w-[960px]">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl">Editar Produto</DialogTitle>
        </DialogHeader>

        <ProductForm 
          form={form} 
          onChange={(f, v) => setForm((s) => ({ ...s, [f]: v }))} 
        />

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={onSaveEdit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;