import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { TableCell } from "@/shared/components/ui/table";
import { AdminProduct } from "../types";

interface Props {
  product: AdminProduct;
  index: number;
  onEdit: (product: AdminProduct) => void;
}

const ProductRow = ({ product, index, onEdit }: Props) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b transition-colors hover:bg-muted/50"
    >
      <TableCell className="font-medium">{product.name}</TableCell>

      <TableCell className="max-w-[300px]">
        <span className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </span>
      </TableCell>

      <TableCell>
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {/* {product.category} */}
        </span>
      </TableCell>

      <TableCell className="text-right">
        R$ {product.price.toFixed(2).replace(".", ",")}
      </TableCell>

      <TableCell className="text-center">
        <span
          className={
            product.stock <= 10 ? "text-destructive" : "text-foreground"
          }
        >
          {product.stock}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <button
          onClick={() => onEdit(product)}
          className="rounded-md p-2 hover:bg-secondary"
        >
          <Pencil size={16} />
        </button>
      </TableCell>
    </motion.tr>
  );
};

export default ProductRow;