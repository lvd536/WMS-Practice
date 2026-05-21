import { TabsContent } from "@/components/ui/tabs";
import { getMovementDataPoint } from "@/utils/analytics.utils";
import MovementActivityChart from "../../Analytics/MovementActivityChart";
import WriteOffChart from "../../Analytics/WriteOffChart";
import { IDetailedInventoryMovement } from "@/types/warehouse.types";

interface IProps {
    globalMovements: IDetailedInventoryMovement[];
}

export default function WarehousesAnalyticsTab({ globalMovements }: IProps) {
    return (
        <TabsContent value="analytics" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <MovementActivityChart
                        data={getMovementDataPoint(globalMovements)}
                        title="Company-wide Operations"
                        description="Daily active movement across all warehouses"
                    />
                </div>

                <div className="xl:col-span-1">
                    <WriteOffChart
                        data={getMovementDataPoint(globalMovements)}
                        title="Loss Tracking"
                    />
                </div>
            </div>
        </TabsContent>
    );
}
