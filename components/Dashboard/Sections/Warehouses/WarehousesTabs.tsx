import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Warehouse, BarChart3, Users } from "lucide-react";

interface IProps {
    warehousesLength: number;
}

export default function WarehousesTabs({ warehousesLength }: IProps) {
    return (
        <div className="border-b border-border">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-8">
                <TabsTrigger
                    value="warehouses"
                    className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                    <Warehouse className="w-4 h-4 mr-2" />
                    Warehouse Racks
                    <Badge
                        variant="secondary"
                        className="ml-2 bg-muted text-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary"
                    >
                        {warehousesLength}
                    </Badge>
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Global Analytics
                </TabsTrigger>
                <TabsTrigger
                    value="Members"
                    className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                    <Users className="w-4 h-4 mr-2" />
                    Members
                </TabsTrigger>
            </TabsList>
        </div>
    );
}
