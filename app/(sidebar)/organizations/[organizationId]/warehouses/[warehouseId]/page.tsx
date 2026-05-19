"use server";

import { getWarehouseInfo } from "@/actions/warehouse.actions";
import { getWarehouseRacks } from "@/actions/rack.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Box, MapPin, Layers, History, ArrowRightLeft } from "lucide-react";
import RackCard from "@/components/Dashboard/Sections/Racks/RackCard";
import RacksHeaderActions from "@/components/Dashboard/Sections/Racks/RacksHeaderActions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getWarehouseInventoryMovements } from "@/actions/logs.actions";
import { Badge } from "@/components/ui/badge";

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
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="font-semibold text-foreground">
                                        Product
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        Route
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        Qty
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        Type
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right font-semibold text-foreground">
                                        Note
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventoryMovements.length > 0 ? (
                                    inventoryMovements.map((m) => (
                                        <TableRow
                                            key={m.id}
                                            className="hover:bg-muted/50 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground leading-none">
                                                        {m.product_name}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground font-mono mt-1">
                                                        {m.product_sku ||
                                                            `ID: ${m.product_id}`}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span
                                                        className={`px-2 py-0.5 rounded border text-[11px] ${
                                                            m.from_rack_name
                                                                ? "bg-card text-foreground border-border"
                                                                : "text-[10px] bg-muted text-muted-foreground border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.from_rack_name ||
                                                            "External"}
                                                    </span>

                                                    <ArrowRightLeft className="w-3 h-3 text-muted-foreground" />

                                                    <span
                                                        className={`px-2 py-0.5 rounded border text-[11px] ${
                                                            m.to_rack_name
                                                                ? "bg-primary/10 text-primary border-primary/20 font-medium"
                                                                : "text-[10px] bg-muted text-muted-foreground border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.to_rack_name ||
                                                            "External"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold text-foreground">
                                                    {m.quantity}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                                        m.movement_type ===
                                                        "receive"
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : m.movement_type ===
                                                                "move"
                                                              ? "bg-primary/10 text-blue-800"
                                                              : m.movement_type ===
                                                                  "writeoff"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-amber-100 text-amber-800"
                                                    }`}
                                                >
                                                    {m.movement_type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                                                {new Date(
                                                    m.created_at,
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right text-muted-foreground italic text-[11px] max-w-37.5 truncate">
                                                {m.note || "—"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="h-32 text-center text-muted-foreground"
                                        >
                                            No movements recorded for this
                                            warehouse.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
