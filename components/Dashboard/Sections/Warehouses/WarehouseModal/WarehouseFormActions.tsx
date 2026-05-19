"use client";

import { Button } from "@/components/ui/button";

interface WarehouseFormActionsProps {
    isEditMode: boolean;
    isLoading: boolean;
    onClose: () => void;
}

export default function WarehouseFormActions({
    isEditMode,
    isLoading,
    onClose,
}: WarehouseFormActionsProps) {
    return (
        <div className="flex justify-end gap-3 pt-4">
            <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700"
            >
                {isLoading
                    ? "Saving..."
                    : isEditMode
                      ? "Save Warehouse"
                      : "Create Warehouse"}
            </Button>
        </div>
    );
}
