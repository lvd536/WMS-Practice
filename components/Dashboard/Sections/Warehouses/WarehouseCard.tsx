"use client";

import { Warehouse, MapPin, ArrowRight, Edit } from "lucide-react";
import { IWarehouse } from "@/types/warehouse.types";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import WarehouseModal from "./WarehouseModal/WarehouseModal";

interface IProps {
    warehouse: IWarehouse;
    canEdit: boolean;
}

export default function WarehouseCard({ warehouse, canEdit }: IProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <div className="group flex flex-col h-full bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="relative h-24 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Warehouse className="w-10 h-10 text-primary/50" />

                    {canEdit && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-primary hover:bg-card/50 rounded-full"
                            onClick={() => setIsEditOpen(true)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                <div className="flex-1 p-5 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {warehouse.name}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                            <span className="truncate">
                                {warehouse.address}
                            </span>
                        </div>
                    </div>

                    <div className="py-2">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                            Capacity
                        </p>
                        <p className="font-medium text-foreground">
                            {warehouse.max_capacity} units
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-muted border-t border-slate-100">
                    <Link
                        href={`warehouses/${warehouse.id}`}
                        className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                        Open Warehouse
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {isEditOpen && (
                <WarehouseModal
                    orgId={warehouse.organization_id}
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    initialData={warehouse}
                />
            )}
        </>
    );
}
