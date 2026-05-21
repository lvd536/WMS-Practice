import { TabsContent } from "@/components/ui/tabs";
import { Layers } from "lucide-react";
import { IWarehouseRack } from "@/types/warehouse.types";
import RackCard from "@/components/Dashboard/Sections/Racks/RackCard";

interface IProps {
    racks: IWarehouseRack[];
    wId: number;
    canEdit: boolean;
}

export default function WarehouseRacks({ racks, wId, canEdit }: IProps) {
    return (
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
    );
}
