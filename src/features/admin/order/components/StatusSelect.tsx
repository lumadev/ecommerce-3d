import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { OrderStatus, OrderStatusLabel } from "@/data/orders";

const adminStatuses: OrderStatus[] = [
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];

export const StatusSelect = ({
  value,
  onChange,
}: {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
}) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as OrderStatus)}
    >
      <SelectTrigger className="h-8 w-[200px] border-border bg-secondary/50 text-xs hover:bg-secondary">
        <SelectValue>
          <span className="text-xs font-medium text-foreground">
            {OrderStatusLabel[value]}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {adminStatuses.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            <span className="text-xs font-medium">
              {OrderStatusLabel[s]}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};