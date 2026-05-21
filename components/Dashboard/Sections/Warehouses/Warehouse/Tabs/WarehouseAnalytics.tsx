import MovementActivityChart from "@/components/Dashboard/Analytics/MovementActivityChart";
import WriteOffChart from "@/components/Dashboard/Analytics/WriteOffChart";
import { TabsContent } from "@/components/ui/tabs";
import { IDetailedInventoryMovement } from "@/types/warehouse.types";
import { getMovementDataPoint } from "@/utils/analytics.utils";

interface IProps {
    inventoryMovements: IDetailedInventoryMovement[];
}

export default function WarehouseAnalytics({ inventoryMovements }: IProps) {
    return (
        <TabsContent value="analytics" className="space-y-6 outline-none">
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
    );
}
