import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button/button";
import { useMerchants } from "./hooks/useMerchants";
import { Merchant } from "./types/merchant.types";

import MerchantTableSkeleton from "./list/MerchantTableSkeleton";
import MerchantTable from "./list/MerchantTable";

import EditMerchantDialog from "./form/EditMerchantDialog";
import CreateMerchantDialog from "./form/CreateMerchantDialog";

const AdminMerchants = () => {
  const { merchantList, isLoading, createMerchant, updateMerchant } =
    useMerchants();

  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">Lojas</h2>

        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus size={16} />
          Nova Loja
        </Button>
      </div>

      {isLoading ? (
        <MerchantTableSkeleton />
      ) : merchantList.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma loja encontrada.</p>
      ) : (
        <MerchantTable merchants={merchantList} onEdit={setEditingMerchant} />
      )}

      <EditMerchantDialog
        merchant={editingMerchant}
        onClose={() => setEditingMerchant(null)}
        onSave={updateMerchant}
      />

      <CreateMerchantDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createMerchant}
      />
    </div>
  );
};

export default AdminMerchants;
