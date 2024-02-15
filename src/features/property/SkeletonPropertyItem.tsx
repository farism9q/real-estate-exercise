import { Skeleton } from "../../components/ui/skeleton";

interface PropertyItemSkeletonProps {
  length: number;
}

export default function PropertyItemSkeleton({
  length = 1,
}: PropertyItemSkeletonProps) {
  return (
    <div className="flex justify-center items-center h-full py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length }, (_, idx) => (
          <div className="flex flex-col space-y-3" key={idx}>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
