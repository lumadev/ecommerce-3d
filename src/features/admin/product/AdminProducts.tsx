import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button/button";

import { useProducts } from "./hooks/useProducts";
import { AdminProduct } from "./types";

import ProductTableSkeleton from "./list/ProductTableSkeleton";
import ProductTable from "./list/ProductTable";
import EditProductDialog from "./form/EditProductDialog";
import CreateProductDialog from "./form/CreateProductDialog";

const AdminProducts = () => {
  const { productList, isLoading, updateProduct, createProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">Produtos</h2>

        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Novo Produto
        </Button>
      </div>

      {isLoading ? (
        <ProductTableSkeleton />
      ) : productList.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum produto encontrado.</p>
      ) : (
        <ProductTable products={productList} onEdit={setEditingProduct} />
      )}

      <EditProductDialog
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={updateProduct}
      />

      <CreateProductDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createProduct}
      />
    </div>
  );
};

export default AdminProducts;