"use server";

import { getWarehouseInfo } from "@/actions/warehouse.actions";
import { getWarehouseRacks } from "@/actions/rack.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Box, MapPin, Layers, History, BarChart3 } from "lucide-react";
import RackCard from "@/components/Dashboard/Sections/Racks/RackCard";
import RacksHeaderActions from "@/components/Dashboard/Sections/Racks/RacksHeaderActions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getWarehouseInventoryMovements } from "@/actions/logs.actions";
import { Badge } from "@/components/ui/badge";
import WarehouseInventoryMovements from "@/components/Dashboard/Sections/Warehouses/WarehouseInventoryMovements";
import MovementActivityChart from "@/components/Dashboard/Analytics/MovementActivityChart";
import { getMovementDataPoint } from "@/utils/analytics.utils";
import WriteOffChart from "@/components/Dashboard/Analytics/WriteOffChart";

interface IProps {
    params: Promise<{ warehouseId: string; organizationId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { organizationId, warehouseId } = await params;

    const wId = Number(warehouseId);
    const orgId = Number(organizationId);

    const [warehouse, racks, userRole, inventoryMovements] = await Promise.all([
        getWarehouseInfo(wId),
        getWarehouseRacks(wId),
        getCurrentUserRole(orgId),
        getWarehouseInventoryMovements(wId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if (
        "error" in warehouse ||
        "error" in racks ||
        "error" in inventoryMovements
    ) {
        return (
            <div className="p-8 text-red-500">
                Failed to load warehouse data.
            </div>
        );
    }

    return (
        <section id="warehouse" className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {warehouse.name}
                    </h1>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center text-sm text-foreground">
                            <MapPin className="w-4 h-4 mr-1.5 text-muted-foreground" />
                            {warehouse.address}
                        </div>
                        <div className="rounded-full w-1 h-1 bg-slate-300 mx-3" />
                        <div className="flex items-center text-sm text-foreground">
                            <Box className="w-4 h-4 mr-1.5 text-muted-foreground" />
                            Max Capacity: {warehouse.max_capacity} units
                        </div>
                    </div>
                </div>

                {canEdit && (
                    <RacksHeaderActions warehouseId={wId} canEdit={canEdit} />
                )}
            </div>
            <Tabs defaultValue="racks" className="w-full space-y-6">
                <div className="border-b border-border">
                    <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-8">
                        <TabsTrigger
                            value="racks"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <Layers className="w-4 h-4 mr-2" />
                            Warehouse Racks
                            <Badge
                                variant="secondary"
                                className="ml-2 bg-muted text-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary"
                            >
                                {racks.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="product_movements"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <History className="w-4 h-4 mr-2" />
                            Product Movements
                            {inventoryMovements.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-2 bg-muted text-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary"
                                >
                                    {inventoryMovements.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Global Analytics
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="racks" className="mt-0 outline-none">
                    {racks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {racks.map((rack) => (
                                <RackCard
                                    key={rack.id}
                                    warehouseId={wId}
                                    rack={rack}
                                    canEdit={canEdit}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Layers className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">
                                No racks found
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                This warehouse doesn&lsquo;t have any racks yet.
                            </p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent
                    value="product_movements"
                    className="mt-0 outline-none"
                >
                    <WarehouseInventoryMovements
                        inventoryMovements={inventoryMovements}
                    />
                </TabsContent>

                <TabsContent
                    value="analytics"
                    className="space-y-6 outline-none"
                >
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2">
                            <MovementActivityChart
                                data={getMovementDataPoint(inventoryMovements)}
                                title="Company-wide Operations"
                                description="Daily active movement across all warehouses"
                            />
                        </div>

                        <div className="xl:col-span-1">
                            <WriteOffChart
                                data={getMovementDataPoint(inventoryMovements)}
                                title="Loss Tracking"
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
