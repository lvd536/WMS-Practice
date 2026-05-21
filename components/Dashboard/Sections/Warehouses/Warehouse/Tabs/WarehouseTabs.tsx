import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, BarChart3, History } from "lucide-react";

interface IProps {
    movementsLength: number;
    racksLength: number;
}

export default function WarehouseTabs({
    movementsLength,
    racksLength,
}: IProps) {
    return (
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
                        {racksLength}
                    </Badge>
                </TabsTrigger>
                <TabsTrigger
                    value="product_movements"
                    className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                    <History className="w-4 h-4 mr-2" />
                    Product Movements
                    {movementsLength > 0 && (
                        <Badge
                            variant="secondary"
                            className="ml-2 bg-muted text-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary"
                        >
                            {movementsLength}
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
    );
}
