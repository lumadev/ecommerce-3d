import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { AdminProduct } from "../types";
import ProductRow from "./ProductRow";

interface Props {
  products: AdminProduct[];
  onEdit: (product: AdminProduct) => void;
}

const ProductTable = ({ products, onEdit }: Props) => {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-center">Estoque</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;