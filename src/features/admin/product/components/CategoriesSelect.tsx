import { Check, ChevronDown } from "lucide-react";

import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

type Category = {
  id: string;
  name: string;
};

type CategoriesSelectProps = {
  value: string[];
  onChange: (categories: string[]) => void;
  categories: Category[];
  placeholder?: string;
  label?: string;
};

export function CategoriesSelect({
  value,
  onChange,
  categories,
  placeholder = "Selecione uma ou mais categorias",
  label = "Categorias",
}: CategoriesSelectProps) {
  const toggleCategory = (categoryName: string, checked: boolean) => {
    if (checked) {
      onChange([...value, categoryName]);
    } else {
      onChange(value.filter((c) => c !== categoryName));
    }
  };

  return (
    <div className="grid gap-2">
      <Label className="text-sm font-medium">{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            <ChevronDown size={16} className="ml-2 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-1"
          align="start"
        >
          <div className="max-h-64 overflow-y-auto">
            {categories.map((cat) => {
              const checked = value.includes(cat.name);

              return (
                <label
                  key={cat.id}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(val) =>
                      toggleCategory(cat.name, Boolean(val))
                    }
                  />

                  <span>{cat.name}</span>

                  {checked && (
                    <Check size={14} className="ml-auto text-primary" />
                  )}
                </label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}