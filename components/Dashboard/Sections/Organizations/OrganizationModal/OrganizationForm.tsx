"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";

import { IOrganization } from "@/types/organization.types";

import {
    organizationSchema,
    OrganizationFormValues,
} from "@/schemas/organization.schema";

interface OrganizationFormProps {
    initialData?: IOrganization | null;
    isLoading: boolean;
    isEditMode: boolean;
    onCancel: () => void;
    onSubmit: (data: OrganizationFormValues) => Promise<void>;
}

export default function OrganizationForm({
    initialData,
    isLoading,
    isEditMode,
    onCancel,
    onSubmit,
}: OrganizationFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<OrganizationFormValues>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>

                <Input
                    id="name"
                    placeholder="e.g. North Logistics Group"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Description</Label>

                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputGroup>
                            <InputGroupTextarea
                                {...field}
                                id="description"
                                placeholder="Main organization for the warehouse management demo."
                                rows={6}
                                className="min-h-24 resize-none"
                                aria-invalid={fieldState.invalid}
                            />

                            {field.value && (
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {field.value.length}/75 characters
                                    </InputGroupText>
                                </InputGroupAddon>
                            )}
                        </InputGroup>
                    )}
                />

                {errors.description && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
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
                          ? "Save Changes"
                          : "Create Organization"}
                </Button>
            </div>
        </form>
    );
}
