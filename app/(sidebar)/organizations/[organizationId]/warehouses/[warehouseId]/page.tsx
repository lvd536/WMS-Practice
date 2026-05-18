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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        {warehouse.name}
                    </h1>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                            {warehouse.address}
                        </div>
                        <div className="rounded-full w-1 h-1 bg-slate-300 mx-3" />
                        <div className="flex items-center text-sm text-slate-600">
                            <Box className="w-4 h-4 mr-1.5 text-slate-400" />
                            Max Capacity: {warehouse.max_capacity} units
                        </div>
                    </div>
                </div>

                {canEdit && (
                    <RacksHeaderActions warehouseId={wId} canEdit={canEdit} />
                )}
            </div>
            <Tabs defaultValue="racks" className="w-full space-y-6">
                <div className="border-b border-slate-200">
                    <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-8">
                        <TabsTrigger
                            value="racks"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
                        >
                            <Layers className="w-4 h-4 mr-2" />
                            Warehouse Racks
                            <Badge
                                variant="secondary"
                                className="ml-2 bg-slate-100 text-slate-600 group-data-[state=active]:bg-indigo-50 group-data-[state=active]:text-indigo-600"
                            >
                                {racks.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="product_movements"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
                        >
                            <History className="w-4 h-4 mr-2" />
                            Product Movements
                            {inventoryMovements.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-2 bg-slate-100 text-slate-600 group-data-[state=active]:bg-indigo-50 group-data-[state=active]:text-indigo-600"
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
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                <Layers className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">
                                No racks found
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                                This warehouse doesn&lsquo;t have any racks yet.
                            </p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent
                    value="product_movements"
                    className="mt-0 outline-none"
                >
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="font-semibold text-slate-700">
                                        Product
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700">
                                        Route
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700">
                                        Qty
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700">
                                        Type
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right font-semibold text-slate-700">
                                        Note
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventoryMovements.length > 0 ? (
                                    inventoryMovements.map((m) => (
                                        <TableRow
                                            key={m.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 leading-none">
                                                        {m.product_name}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-mono mt-1">
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
                                                                ? "bg-white text-slate-600 border-slate-200"
                                                                : "text-[10px] bg-slate-100 text-slate-400 border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.from_rack_name ||
                                                            "External"}
                                                    </span>

                                                    <ArrowRightLeft className="w-3 h-3 text-slate-300" />

                                                    <span
                                                        className={`px-2 py-0.5 rounded border text-[11px] ${
                                                            m.to_rack_name
                                                                ? "bg-indigo-50 text-indigo-700 border-indigo-100 font-medium"
                                                                : "text-[10px] bg-slate-100 text-slate-400 border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.to_rack_name ||
                                                            "External"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold text-slate-700">
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
                                                              ? "bg-blue-100 text-blue-800"
                                                              : m.movement_type ===
                                                                  "writeoff"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-amber-100 text-amber-800"
                                                    }`}
                                                >
                                                    {m.movement_type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-xs whitespace-nowrap">
                                                {new Date(
                                                    m.created_at,
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right text-slate-400 italic text-[11px] max-w-[150px] truncate">
                                                {m.note || "—"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="h-32 text-center text-slate-400"
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
