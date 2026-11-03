import { Link } from "react-router-dom";
import type { Category } from "@/features/category/types/category.types";

interface CategoriesSectionProps {
  categories: Category[];
  selectedCategory?: string | null;
}

const CategoriesSection = ({
  categories,
  selectedCategory = null,
}: CategoriesSectionProps) => {
  if (categories.length === 0) return null;

  const linkClassName = (isActive: boolean) =>
    `shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      isActive
        ? "bg-primary/10 font-medium text-primary"
        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <nav
      id="categorias"
      aria-label="Filtrar produtos por categoria"
      className="border-y border-border/60 py-4 sm:py-5"
    >
      <div className="container mx-auto flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:gap-6">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Explorar categorias
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          <Link
            to="/produtos"
            aria-current={selectedCategory === null ? "page" : undefined}
            className={linkClassName(selectedCategory === null)}
          >
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/produtos?category=${encodeURIComponent(category.name)}`}
              aria-current={selectedCategory === category.name ? "page" : undefined}
              className={linkClassName(selectedCategory === category.name)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoriesSection;
