import { Skeleton } from "@/shared/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-background pt-16"
      role="status"
      aria-live="polite"
      aria-label="Carregando produto"
    >
      <div className="container mx-auto px-4 pt-12 pb-4">
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Media */}
            <div className="flex flex-col gap-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-16 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="mb-4 h-9 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-6 h-4 w-2/3" />

              <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
                <Skeleton className="h-9 w-32" />

                <div className="flex items-center gap-4">
                  <Skeleton className="h-11 w-32 rounded-lg" />
                  <Skeleton className="h-11 flex-1 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsSkeleton;
