import { Skeleton } from "@/shared/components/ui/skeleton";

const HeroCarouselSkeleton = () => {
  return (
    <div
      className="relative"
      role="status"
      aria-live="polite"
      aria-label="Carregando destaques"
    >
      <Skeleton className="aspect-[4/3] w-full rounded-2xl" />

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-2 w-2 rounded-full" />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default HeroCarouselSkeleton;
