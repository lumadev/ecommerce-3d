import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button/button";
import { Category } from "@/data/categories";

import { useCategories } from "./hooks/useCategories";
import CategoryTable from "./list/CategoryTable";
import EditCategoryDialog from "./form/EditCategoryDialog";
import CreateCategoryDialog from "./form/CreateCategoryDialog";

const AdminCategories = () => {
  const { categoryList, updateCategory, createCategory } = useCategories();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">Categorias</h2>

        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Nova Categoria
        </Button>
      </div>

      <CategoryTable categories={categoryList} onEdit={setEditingCategory} />

      <EditCategoryDialog
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        onSave={updateCategory}
      />

      <CreateCategoryDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createCategory}
      />
    </div>
  );
};

export default AdminCategories;
