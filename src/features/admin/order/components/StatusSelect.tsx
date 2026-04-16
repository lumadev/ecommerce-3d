import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import { OrderStatus, OrderStatusColor, OrderStatusLabel } from "@/data/orders";

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
    <Select value={value} onValueChange={(val) => onChange(val as OrderStatus)}>
      <SelectTrigger className="h-8 w-[200px] border-border text-xs">
        <SelectValue>
          <Badge
            variant="outline"
            className={`${OrderStatusColor[value]} text-[11px]`}
          >
            {OrderStatusLabel[value]}
          </Badge>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {adminStatuses.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            <Badge
              variant="outline"
              className={`${OrderStatusColor[s]} text-[11px]`}
            >
              {OrderStatusLabel[s]}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};