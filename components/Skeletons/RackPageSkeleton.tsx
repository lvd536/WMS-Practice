import { Skeleton } from "@/components/ui/skeleton";

export default function RackPageSkeleton() {
    return (
        <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                </div>
                <div className="flex gap-6">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 bg-card p-4 border border-border rounded-xl">
                <Skeleton className="h-10 w-full max-w-sm" />
                <Skeleton className="h-10 w-32" />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex gap-4">
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="divide-y divide-border">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="px-6 py-4 flex items-center gap-4"
                        >
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-3 w-1/6" />
                            </div>
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center bg-card p-4 border border-border rounded-xl">
                <Skeleton className="h-4 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
    );
}
