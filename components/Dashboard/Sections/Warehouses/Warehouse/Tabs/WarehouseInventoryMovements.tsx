import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { IDetailedInventoryMovement } from "@/types/warehouse.types";
import { ArrowRightLeft } from "lucide-react";

interface IProps {
    inventoryMovements: IDetailedInventoryMovement[];
}

export default function WarehouseInventoryMovements({
    inventoryMovements,
}: IProps) {
    return (
        <TabsContent value="product_movements" className="mt-0 outline-none">
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
                                                {m.from_rack_name || "External"}
                                            </span>

                                            <ArrowRightLeft className="w-3 h-3 text-muted-foreground" />

                                            <span
                                                className={`px-2 py-0.5 rounded border text-[11px] ${
                                                    m.to_rack_name
                                                        ? "bg-primary/10 text-primary border-primary/20 font-medium"
                                                        : "text-[10px] bg-muted text-muted-foreground border-transparent italic"
                                                }`}
                                            >
                                                {m.to_rack_name || "External"}
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
                                                m.movement_type === "receive"
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : m.movement_type === "move"
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
                                        {new Date(m.created_at).toLocaleString(
                                            [],
                                            {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            },
                                        )}
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
                                    No movements recorded for this warehouse.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
    );
}
