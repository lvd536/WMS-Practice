import { Box, MapPin } from "lucide-react";
import RacksHeaderActions from "@/components/Dashboard/Sections/Racks/RacksHeaderActions";
import { IWarehouse } from "@/types/warehouse.types";

interface IProps {
    warehouse: IWarehouse;
    wId: number;
    canEdit: boolean;
}

export default function WarehouseHeader({ warehouse, wId, canEdit }: IProps) {
    const { name, address, max_capacity } = warehouse;

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {name}
                </h1>
                <div className="flex items-center mt-2">
                    <div className="flex items-center text-sm text-foreground">
                        <MapPin className="w-4 h-4 mr-1.5 text-muted-foreground" />
                        {address}
                    </div>
                    <div className="rounded-full w-1 h-1 bg-slate-300 mx-3" />
                    <div className="flex items-center text-sm text-foreground">
                        <Box className="w-4 h-4 mr-1.5 text-muted-foreground" />
                        Max Capacity: {max_capacity} units
                    </div>
                </div>
            </div>

            {canEdit && (
                <RacksHeaderActions warehouseId={wId} canEdit={canEdit} />
            )}
        </div>
    );
}
