"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { RackFormValues } from "@/schemas/rack.schema";

interface RackFormFieldsProps {
    form: UseFormReturn<RackFormValues>;
}

export default function RackFormFields({ form }: RackFormFieldsProps) {
    const {
        register,

        formState: { errors },
    } = form;

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Rack Name</Label>

                    <Input
                        id="name"
                        placeholder="e.g. A1 Zone"
                        {...register("name")}
                    />

                    {errors.name && (
                        <p className="text-sm font-medium text-red-500">
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
                        <p className="text-sm font-medium text-red-500">
                            {errors.code.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>

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
                        id="max_weight"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 1000"
                        {...register("max_weight", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.max_weight && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.max_weight.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="max_volume">Max Volume (m³)</Label>

                    <Input
                        id="max_volume"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 50.5"
                        {...register("max_volume", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.max_volume && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.max_volume.message}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
