import { Link } from "react-router-dom";
import type { Category } from "@/features/category/types/category.types";

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (categories.length === 0) return null;

  return (
    <nav
      id="categorias"
      aria-label="Filtrar produtos por categoria"
      className="py-4 sm:py-5"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/produtos?category=${encodeURIComponent(category.name)}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
