import { Skeleton } from "@/shared/components/ui/skeleton";

const SKELETON_ITEMS = 4;

const SearchResultsSkeleton = () => (
  <div className="p-2" aria-busy="true" aria-label="Carregando produtos">
    {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
      <div key={index} className="flex items-center gap-3 px-2 py-3">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export default SearchResultsSkeleton;
