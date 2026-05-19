import { Skeleton } from "../ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <>
            <Skeleton className="w-72 h-9 mb-8 mt-4 bg-gray-300" />
            <Skeleton className="flex flex-wrap w-full gap-5 bg-transparent">
                <Skeleton className="w-78 h-64 bg-gray-300" />
                <Skeleton className="w-78 h-64 bg-gray-300" />
                <Skeleton className="w-78 h-64 bg-gray-300" />
            </Skeleton>
        </>
    );
}
