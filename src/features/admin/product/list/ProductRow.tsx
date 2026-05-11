import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { TableCell } from "@/shared/components/ui/table";
import { ProductListItem } from "../types/product.types";

interface Props {
  product: ProductListItem;
  index: number;
  onEdit: (product: ProductListItem) => void;
}

const ProductRow = ({ product, index, onEdit }: Props) => {
  const numericPrice = Number(product.price);
  const formattedPrice = Number.isFinite(numericPrice)
    ? numericPrice.toFixed(2).replace(".", ",")
    : "0,00";

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
        <div className="flex flex-wrap gap-1">
          {product.categories.map((category) => (
            <span
              key={category.id}
              className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {category.name}
            </span>
          ))}
        </div>
      </TableCell>

      <TableCell className="text-right">
        R$ {formattedPrice}
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