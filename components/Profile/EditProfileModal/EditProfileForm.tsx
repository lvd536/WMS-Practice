"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getUserProfile, updateUserProfile } from "@/actions/user.actions";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import {
    EditProfileFormValues,
    formSchema,
} from "@/schemas/profile-form-schema";
import { ProfileFormFields } from "./ProfileFormFields";
import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditProfileForm() {
    const profile = useUserStore((s) => s.user);
    const user = useAuthStore((s) => s.user);

    const form = useForm<EditProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: profile?.name ?? "",
            about: profile?.about ?? "",
            phone: profile?.phone ?? "",
            avatar: null,
            background: null,
        },
    });

    const onSubmit = async (data: EditProfileFormValues) => {
        toast.promise(
            async () => {
                if (!user) throw new Error("User is not defined");

                const updated = await updateUserProfile(data, user.id);
                if (updated.status !== "success") {
                    throw new Error(
                        updated.error?.message || "Failed to update profile",
                    );
                }

                const profile = await getUserProfile(user.id);
                if ("error" in profile) throw new Error(profile.error.message);

                useUserStore.getState().setUser(profile);
                return "Your profile successfully updated";
            },
            {
                loading: "Updating profile...",
                success: (msg) => msg,
                error: (error) =>
                    error instanceof Error
                        ? error.message
                        : "Profile update error",
            },
        );
    };

    return (
        <form id="edit-profile-form" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-3">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&lsquo;re done.
                </DialogDescription>
            </DialogHeader>

            <ProfileFormFields control={form.control} />

            <DialogFooter className="mt-2">
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
    );
}
