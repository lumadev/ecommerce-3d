import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { ProductFormState } from "../types";

interface Props {
  form: ProductFormState;
  onChange: (field: keyof ProductFormState, value: string) => void;
  showCategory?: boolean;
}

const ProductForm = ({ form, onChange, showCategory }: Props) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Nome</Label>
        <Input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      {showCategory && (
        <div className="grid gap-2">
          <Label>Categoria</Label>
          <Input
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label>Descrição</Label>
        <Textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={(e) => onChange("price", e.target.value)}
        />

        <Input
          type="number"
          placeholder="Estoque"
          value={form.stock}
          onChange={(e) => onChange("stock", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductForm;