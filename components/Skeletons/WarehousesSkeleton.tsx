import { Skeleton } from "@/components/ui/skeleton";

export default function WarehousesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col h-full bg-card rounded-xl border border-border shadow-sm p-4 space-y-4"
                >
                    <Skeleton className="h-24 w-full rounded-lg" />

                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-20 rounded-full" />
                    </div>

                    <div className="mt-auto pt-4 border-t border-border">
                        <Skeleton className="h-8 w-full rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}
