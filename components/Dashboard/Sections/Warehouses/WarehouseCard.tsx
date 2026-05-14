"use client";

import { Warehouse, MapPin, ArrowRight, Edit } from "lucide-react";
import { IWarehouse } from "@/types/warehouse.types";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import WarehouseModal from "./WarehouseModal";

interface IProps {
    warehouse: IWarehouse;
    canEdit: boolean;
}

export default function WarehouseCard({ warehouse, canEdit }: IProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <div className="group flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="relative h-24 bg-linear-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
                    <Warehouse className="w-10 h-10 text-indigo-600/50" />

                    {canEdit && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-indigo-600 hover:bg-white/50 rounded-full"
                            onClick={() => setIsEditOpen(true)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                <div className="flex-1 p-5 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {warehouse.name}
                        </h3>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                            <span className="truncate">
                                {warehouse.address}
                            </span>
                        </div>
                    </div>

                    <div className="py-2">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Capacity
                        </p>
                        <p className="font-medium text-slate-700">
                            {warehouse.max_capacity} units
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Link
                        href={`warehouses/warehouse/${warehouse.id}`}
                        className="w-full flex items-center justify-between text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
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
