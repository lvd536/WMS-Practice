"use client";

import { Layers, ArrowRight, Edit, Hash, FileText } from "lucide-react";
import { IWarehouseRack } from "@/types/warehouse.types";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RackModal from "./RackModal";

interface IProps {
    warehouseId: number;
    rack: IWarehouseRack;
    canEdit: boolean;
}

export default function RackCard({ rack, canEdit, warehouseId }: IProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <div className="group flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="relative h-24 bg-linear-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
                    <Layers className="w-10 h-10 text-indigo-600/50" />

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
                            {rack.name}
                        </h3>
                        <div className="flex flex-col space-y-1 mt-2">
                            <div className="flex items-center text-xs text-slate-500">
                                <Hash className="w-3.5 h-3.5 mr-1 shrink-0" />
                                <span className="truncate font-mono">
                                    Code: {rack.code}
                                </span>
                            </div>
                            {rack.description && (
                                <div className="flex items-start text-xs text-slate-500">
                                    <FileText className="w-3.5 h-3.5 mr-1 shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">
                                        {rack.description}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-50">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Weight
                            </p>
                            <p className="font-medium text-slate-700 text-sm">
                                {rack.current_weight} / {rack.max_weight} kg
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Volume
                            </p>
                            <p className="font-medium text-slate-700 text-sm">
                                {rack.current_volume} / {rack.max_volume} m³
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Link
                        href={`${warehouseId}/${rack.id}`}
                        className="w-full flex items-center justify-between text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                    >
                        View Products
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {isEditOpen && (
                <RackModal
                    warehouseId={rack.warehouse_id}
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    initialData={rack}
                />
            )}
        </>
    );
}
