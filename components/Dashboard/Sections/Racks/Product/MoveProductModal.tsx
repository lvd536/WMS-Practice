"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    IRackProduct,
    IWarehouse,
    IWarehouseRack,
} from "@/types/warehouse.types";
import { moveProduct } from "@/actions/rack.actions";
import { getWarehouseRacks } from "@/actions/rack.actions";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface IMoveProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
    currentRackId: number;
    warehouses: IWarehouse[];
}

export default function MoveProductModal({
    isOpen,
    onClose,
    product,
    currentRackId,
    warehouses,
}: IMoveProductModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [targetRacks, setTargetRacks] = useState<IWarehouseRack[]>([]);

    const moveSchema = z.object({
        warehouse_id: z.number().min(1, "Select target warehouse"),
        rack_id: z.number().min(1, "Select target rack"),
        quantity: z
            .number()
            .min(1)
            .max(
                product?.placement_quantity,
                `Max available is ${product?.placement_quantity}`,
            ),
    });

    type MoveFormValues = z.infer<typeof moveSchema>;

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<MoveFormValues>({
        resolver: zodResolver(moveSchema),
        defaultValues: { quantity: 1 },
    });

    const selectedWarehouseId = watch("warehouse_id");

    useEffect(() => {
        if (!selectedWarehouseId) return;
        const fetchRacks = async () => {
            const racks = await getWarehouseRacks(selectedWarehouseId);
            if (Array.isArray(racks)) {
                setTargetRacks(racks.filter((r) => r.id !== currentRackId));
            }
        };
        fetchRacks();
    }, [selectedWarehouseId, currentRackId]);

    const onSubmit = async (data: MoveFormValues) => {
        setIsLoading(true);
        try {
            await moveProduct(
                product.placement_id,
                product.id,
                currentRackId,
                data.rack_id,
                data.quantity,
                product.placement_quantity,
            );
            router.refresh();
            onClose();
            reset();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Move Product</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg mb-4 border border-slate-100">
                    <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                            {product?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                            Available: {product?.placement_quantity}
                        </p>
                    </div>
                    <ArrowRight className="text-slate-400 w-5 h-5" />
                    <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-indigo-600">
                            Target Location
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Select Target Warehouse</Label>
                        <Controller
                            control={control}
                            name="warehouse_id"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.warehouse_id
                                                ? "border-red-500"
                                                : ""
                                        }
                                    >
                                        <SelectValue placeholder="Select warehouse..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {warehouses.map((w) => (
                                            <SelectItem
                                                key={w.id}
                                                value={w.id.toString()}
                                            >
                                                {w.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.warehouse_id && (
                            <p className="text-sm text-red-500">
                                {errors.warehouse_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Select Target Rack</Label>
                        <Controller
                            control={control}
                            name="rack_id"
                            render={({ field }) => (
                                <Select
                                    disabled={
                                        !selectedWarehouseId ||
                                        targetRacks.length === 0
                                    }
                                    onValueChange={(val) =>
                                        field.onChange(Number(val))
                                    }
                                >
                                    <SelectTrigger
                                        className={
                                            errors.rack_id
                                                ? "border-red-500"
                                                : ""
                                        }
                                    >
                                        <SelectValue
                                            placeholder={
                                                targetRacks.length === 0 &&
                                                selectedWarehouseId
                                                    ? "No racks available"
                                                    : "Select rack..."
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {targetRacks.map((r) => (
                                            <SelectItem
                                                key={r.id}
                                                value={r.id.toString()}
                                            >
                                                {r.name} ({r.code})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.rack_id && (
                            <p className="text-sm text-red-500">
                                {errors.rack_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Quantity to move</Label>
                        <Input
                            type="number"
                            {...register("quantity", { valueAsNumber: true })}
                        />
                        {errors.quantity && (
                            <p className="text-sm text-red-500">
                                {errors.quantity.message}
                            </p>
                        )}
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
                            {isLoading ? "Moving..." : "Confirm Move"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
