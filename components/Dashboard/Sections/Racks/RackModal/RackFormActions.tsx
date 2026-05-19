"use client";

import { Button } from "@/components/ui/button";

interface RackFormActionsProps {
    isEditMode: boolean;
    isLoading: boolean;
    onClose: () => void;
}

export default function RackFormActions({
    isEditMode,
    isLoading,
    onClose,
}: RackFormActionsProps) {
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
                className="bg-primary hover:bg-primary/90"
            >
                {isLoading
                    ? "Saving..."
                    : isEditMode
                      ? "Save Rack"
                      : "Create Rack"}
            </Button>
        </div>
    );
}
