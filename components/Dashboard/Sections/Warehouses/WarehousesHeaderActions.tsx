"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import WarehouseModal from "./WarehouseModal";

export default function WarehousesHeaderActions({ orgId }: { orgId: number }) {
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsAddOpen(true)}
                className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-md"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Warehouse
            </Button>

            {isAddOpen && (
                <WarehouseModal
                    orgId={orgId}
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                />
            )}
        </>
    );
}
