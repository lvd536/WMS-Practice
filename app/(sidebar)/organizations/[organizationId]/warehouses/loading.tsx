import WarehousesSkeleton from "@/components/Skeletons/WarehousesSkeleton";

export default function Loading() {
    return (
        <section className="p-6 md:p-8 space-y-8">
            <div className="h-20 w-full animate-pulse bg-muted rounded-lg" />
            <WarehousesSkeleton />
        </section>
    );
}
