import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { TableCell } from "@/shared/components/ui/table";
import { Merchant } from "../types/merchant.types";

interface Props {
  merchant: Merchant;
  index: number;
  onEdit: (merchant: Merchant) => void;
}

const MerchantRow = ({ merchant, index, onEdit }: Props) => (
  <motion.tr
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="border-b transition-colors hover:bg-muted/50"
  >
    <TableCell className="font-medium text-foreground">{merchant.name}</TableCell>

    <TableCell className="text-sm text-muted-foreground">{merchant.code}</TableCell>

    <TableCell className="text-sm text-muted-foreground">
      {merchant.email ?? "-"}
    </TableCell>

    <TableCell className="text-sm text-muted-foreground">
      {merchant.domain ?? "-"}
    </TableCell>

    <TableCell>
      <Badge variant={merchant.isActive ? "secondary" : "outline"}>
        {merchant.isActive ? "Ativa" : "Inativa"}
      </Badge>
    </TableCell>

    <TableCell className="text-center">
      <button
        onClick={() => onEdit(merchant)}
        aria-label={`Editar ${merchant.name}`}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
      >
        <Pencil size={16} />
      </button>
    </TableCell>
  </motion.tr>
);

export default MerchantRow;
