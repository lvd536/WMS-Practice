import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrganizationsSkeleton() {
    return (
        <>
            <Skeleton className="h-10 w-64 rounded-lg mt-4 mb-2" />
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-50 rounded-lg" />
                <Skeleton className="h-9 w-30 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {[...Array(8)].map((_, i) => (
                    <Card key={i} className="p-6 space-y-4 shadow-none">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </Card>
                ))}
            </div>
        </>
    );
}
