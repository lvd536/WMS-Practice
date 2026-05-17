"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IWarehouseRack } from "@/types/warehouse.types";
import { createRack, updateRack } from "@/actions/rack.actions";

const rackSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    code: z.string().min(2, "Code must be at least 2 characters"),
    description: z.string().optional(),
    max_weight: z.number().min(0, "Max weight cannot be negative"),
    max_volume: z.number().min(0, "Max volume cannot be negative"),
});

type RackFormValues = z.infer<typeof rackSchema>;

interface IRackModalProps {
    warehouseId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouseRack | null;
}

export default function RackModal({
    warehouseId,
    isOpen,
    onClose,
    initialData,
}: IRackModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RackFormValues>({
        resolver: zodResolver(rackSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            code: initialData?.code ?? "",
            description: initialData?.description ?? "",
            max_weight: initialData?.max_weight ?? 0,
            max_volume: initialData?.max_volume ?? 0,
        } as RackFormValues,
    });

    const onSubmit = async (data: RackFormValues) => {
        setIsLoading(true);
        try {
            if (isEditMode && initialData) {
                await updateRack(initialData.id, data);
            } else {
                await createRack({
                    ...data,
                    warehouse_id: warehouseId,
                });
            }
            router.refresh();
            reset();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Rack" : "Add New Rack"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Rack Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. A1 Zone"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code">Rack Code</Label>
                            <Input
                                id="code"
                                placeholder="e.g. RCK-A1-001"
                                {...register("code")}
                            />
                            {errors.code && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.code.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description (Optional)
                        </Label>
                        <Input
                            id="description"
                            placeholder="e.g. Heavy duty rack for electronics"
                            {...register("description")}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="max_weight">Max Weight (kg)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                id="max_weight"
                                placeholder="e.g. 1000"
                                {...register("max_weight", {
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.max_weight && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.max_weight.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="max_volume">Max Volume (m³)</Label>
                            <Input
                                type="number"
                                step="0.01"
                                id="max_volume"
                                placeholder="e.g. 50.5"
                                {...register("max_volume", {
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.max_volume && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.max_volume.message}
                                </p>
                            )}
                        </div>
                    </div>

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
                            {isLoading ? "Saving..." : "Save Rack"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
