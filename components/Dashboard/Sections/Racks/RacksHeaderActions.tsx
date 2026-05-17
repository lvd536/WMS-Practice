"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import RackModal from "./RackModal";

export default function RacksHeaderActions({
    warehouseId,
    canEdit,
}: {
    warehouseId: number;
    canEdit: boolean;
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);

    if (!canEdit) return null;

    return (
        <>
            <Button
                onClick={() => setIsAddOpen(true)}
                className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-md"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Rack
            </Button>

            {isAddOpen && (
                <RackModal
                    warehouseId={warehouseId}
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                />
            )}
        </>
    );
}
