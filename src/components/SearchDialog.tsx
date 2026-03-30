import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Package } from "lucide-react";
import { products } from "@/data/products";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
    }
    onOpenChange(nextOpen);
  };

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedSearch) ||
          p.category.toLowerCase().includes(normalizedSearch) ||
          p.description.toLowerCase().includes(normalizedSearch)
      );
  }, [search]);

  const handleSelect = (productId: string) => {
    onOpenChange(false);
    navigate(`/produto/${productId}`);
  };

  const handleCustomOrder = () => {
    onOpenChange(false);
    const section = document.getElementById("encomenda");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("encomenda")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <CommandInput
        placeholder="Buscar produtos, categorias..."
        value={search}
        onValueChange={setSearch}
        className="h-14 text-base"
      />
      <CommandList>
        {search.length > 0 && filtered.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum produto encontrado.
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <CommandGroup heading="Produtos">
            {filtered.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => handleSelect(product.id)}
                className="group flex items-center gap-3 py-3 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{product.name}</span>
                  <span className="text-xs text-muted-foreground group-data-[selected=true]:text-accent-foreground/80">{product.category}</span>
                </div>
                <span className="text-sm font-semibold text-primary whitespace-nowrap">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                {product.customizable && (
                  <Sparkles size={14} className="text-primary shrink-0" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        <CommandGroup forceMount>
          <CommandItem
            onSelect={handleCustomOrder}
            className="group flex items-center gap-3 py-3 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Package size={18} className="text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                Não encontrou o que queria?
              </span>
              <span className="text-xs text-muted-foreground group-data-[selected=true]:text-accent-foreground/80">
                Clique aqui para personalizar sua encomenda
              </span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
