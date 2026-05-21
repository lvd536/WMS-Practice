import { TabsContent } from "@/components/ui/tabs";
import { Warehouse } from "lucide-react";
import WarehouseCard from "./Warehouse/WarehouseCard";
import { IWarehouse } from "@/types/warehouse.types";

interface IProps {
    warehouses: IWarehouse[];
    canEdit: boolean;
}

export default function WarehousesTab({ warehouses, canEdit }: IProps) {
    return (
        <TabsContent value="warehouses" className="mt-0 outline-none">
            {warehouses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {warehouses.map((warehouse) => (
                        <WarehouseCard
                            key={warehouse.id}
                            warehouse={warehouse}
                            canEdit={canEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Warehouse className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground">
                        No warehouses found
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                        This organization doesn&lsquo;t have any warehouses yet.
                    </p>
                </div>
            )}
        </TabsContent>
    );
}
