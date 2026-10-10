import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Merchant } from "../types/merchant.types";
import MerchantRow from "./MerchantRow";

interface Props {
  merchants: Merchant[];
  onEdit: (merchant: Merchant) => void;
}

const MerchantTable = ({ merchants, onEdit }: Props) => (
  <div className="rounded-lg border border-border bg-card">
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead>Código</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Domínio</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16 text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {merchants.map((merchant, index) => (
          <MerchantRow
            key={merchant.id}
            merchant={merchant}
            index={index}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

export default MerchantTable;
