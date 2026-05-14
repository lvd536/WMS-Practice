"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { IOrganization } from "@/types/organization.types";
import {
    createOrganization,
    updateOrganization,
} from "@/actions/organization.actions";
import { useUserStore } from "@/stores/user.store";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { getAllOrganizations } from "@/actions/organization.actions";
import { useOrganizationsStore } from "@/stores/organizations.store";

const organizationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z
        .string()
        .max(75, "Description must be at most 75 characters.")
        .optional(),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

interface IOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IOrganization | null;
}

export default function OrganizationModal({
    isOpen,
    onClose,
    initialData,
}: IOrganizationModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { currentOrganization, setCurrentOrganization } =
        useOrganizationsStore();
    const isEditMode = !!initialData;
    const user = useUserStore((s) => s.user);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<OrganizationFormValues>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
        } as OrganizationFormValues,
    });

    const onSubmit = async (data: OrganizationFormValues) => {
        if (!user) return;
        setIsLoading(true);
        try {
            if (isEditMode && initialData) {
                await updateOrganization(initialData.id, data);
            } else {
                await createOrganization({
                    ...data,
                    owner_id: user.id!,
                });
            }
            const freshOrgs = await getAllOrganizations();

            if (Array.isArray(freshOrgs)) {
                useOrganizationsStore.setState({ organizations: freshOrgs });
                if (isEditMode && currentOrganization?.id === initialData?.id) {
                    const updatedCurrent = freshOrgs.find(
                        (o) => o.id === initialData.id,
                    );
                    if (updatedCurrent) setCurrentOrganization(updatedCurrent);
                }
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

    if (!user) onClose();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode
                            ? "Edit Organization"
                            : "Add New Organization"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Organization Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. North Logistics Group"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
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
                                                {field.value.length}/75
                                                characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    )}
                                </InputGroup>
                            )}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.description.message}
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
                            {isLoading ? "Saving..." : "Save Organization"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
