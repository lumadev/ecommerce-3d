import { useState } from "react";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { products as initialProducts, Product } from "@/data/products";
import { toast } from "sonner";

interface AdminProduct extends Product {
  stock: number;
}

const AdminProducts = () => {
  const [productList, setProductList] = useState<AdminProduct[]>(() =>
    initialProducts.map((p) => ({
      ...p,
      stock: Math.floor(Math.random() * 50) + 5,
    }))
  );
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", price: "", stock: "" });

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price.toFixed(2),
      stock: product.stock.toString(),
    });
  };

  const handleSave = () => {
    if (!editingProduct) return;
    const price = parseFloat(editForm.price);
    const stock = parseInt(editForm.stock);
    if (isNaN(price) || isNaN(stock) || !editForm.name.trim()) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }
    setProductList((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? { ...p, name: editForm.name.trim(), description: editForm.description.trim(), price, stock }
          : p
      )
    );
    toast.success(`"${editForm.name.trim()}" atualizado com sucesso.`);
    setEditingProduct(null);
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-foreground">Produtos</h2>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead className="max-w-[300px]">Descrição</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-center">Estoque</TableHead>
              <TableHead className="w-16 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                <TableCell className="max-w-[300px]">
                  <span className="line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`text-sm font-medium ${
                      product.stock <= 10 ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => openEdit(product)}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Altere as informações do produto abaixo.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                rows={4}
                value={editForm.description}
                onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editForm.price}
                  onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={editForm.stock}
                  onChange={(e) => setEditForm((f) => ({ ...f, stock: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
