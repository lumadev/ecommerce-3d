import { Skeleton } from "@/shared/components/ui/skeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

const ProductGridSkeleton = ({ count = 6 }: ProductGridSkeletonProps) => {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-live="polite"
      aria-label="Carregando produtos"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-border bg-gradient-card"
        >
          <Skeleton className="aspect-square w-full rounded-none" />

          <div className="p-5">
            <Skeleton className="mb-2 h-3 w-1/3" />
            <Skeleton className="mb-3 h-5 w-3/4" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="mb-4 h-3 w-2/3" />

            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
