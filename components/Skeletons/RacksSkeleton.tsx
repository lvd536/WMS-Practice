import { Skeleton } from "@/components/ui/skeleton";

export default function RacksSkeleton() {
    return (
        <>
            <div className="h-20 w-full animate-pulse bg-muted rounded-lg mb-8 mt-4" />
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
                            <Skeleton className="h-4 w-1/2" />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-20 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>

                        <div className="mt-auto pt-4 border-t border-border">
                            <Skeleton className="h-8 w-full rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
