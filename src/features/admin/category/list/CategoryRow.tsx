import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { TableCell } from "@/shared/components/ui/table";
import { Category } from "@/data/categories";

interface Props {
  category: Category;
  index: number;
  onEdit: (category: Category) => void;
}

const CategoryRow = ({ category, index, onEdit }: Props) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b transition-colors hover:bg-muted/50"
    >
      <TableCell className="font-medium text-foreground">
        <div className="flex items-center gap-3">
          <img
            src={category.url}
            alt={category.name}
            className="h-10 w-10 rounded-md border border-border object-cover"
          />
          <span>{category.name}</span>
        </div>
      </TableCell>

      <TableCell>
        <span className="line-clamp-2 text-sm text-muted-foreground">
          {category.description}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <button
          onClick={() => onEdit(category)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Pencil size={16} />
        </button>
      </TableCell>
    </motion.tr>
  );
};

export default CategoryRow;
