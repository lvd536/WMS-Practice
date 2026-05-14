"use server";

import { createClient } from "@/lib/supabase/server";
import { IOrganization } from "@/types/organization.types";
import { revalidatePath } from "next/cache";

export async function getAllOrganizations() {
    try {
        const supabase = await createClient();
        const { data: organizations, error: organizationsError } =
            await supabase.from("organizations").select();

        if (organizationsError) throw new Error(organizationsError.message);

        return organizations as IOrganization[];
    } catch (err) {
        console.error("getAllOrganizations error:", err);
        return {
            status: "error",
            error: {
                message:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred",
            },
        };
    }
}

export async function createOrganization(
    organization: Omit<IOrganization, "id">,
) {
    try {
        const supabase = await createClient();

        const { error: organizationCreationError } = await supabase
            .from("organizations")
            .insert(organization);

        if (organizationCreationError)
            throw new Error(organizationCreationError.message);

        revalidatePath("/organizations/", "page");

        return true;
    } catch (err) {
        console.error("createOrganization error:", err);
        return {
            status: "error",
            error: {
                message:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred",
            },
        };
    }
}

export async function deleteOrganization(organizationId: number) {
    try {
        const supabase = await createClient();
        const { error: organizationDeleteError } = await supabase
            .from("organizations")
            .delete()
            .eq("id", organizationId);

        if (organizationDeleteError)
            throw new Error(organizationDeleteError.message);

        revalidatePath("/organizations/", "page");

        return true;
    } catch (err) {
        console.error("deleteOrganization error:", err);
        return {
            status: "error",
            error: {
                message:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred",
            },
        };
    }
}

export async function updateOrganization(
    organizationId: number,
    organizationData: Partial<Omit<IOrganization, "id">>,
) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from("organizations")
            .update(organizationData)
            .eq("id", organizationId);

        if (error) throw new Error(error.message);

        revalidatePath("/organizations/", "page");

        return { status: "success" };
    } catch (err) {
        console.error("updateOrganization error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}

export async function inviteUserToOrganization(orgId: number, email: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user: currentUser },
        } = await supabase.auth.getUser();
        if (!currentUser) throw new Error("Not authenticated");

        const { data: targetUserId, error: findError } = await supabase.rpc(
            "get_user_id_by_email",
            { user_email: email },
        );

        if (findError) throw new Error(findError.message);

        if (!targetUserId) {
            return {
                status: "error",
                message: "User with this email not found in the system.",
            };
        }

        const { error: inviteError } = await supabase
            .from("organization_invitations")
            .insert({
                organization_id: orgId,
                user_id: targetUserId,
                invited_by: currentUser.id,
                status: "pending",
            });

        if (inviteError) {
            if (inviteError.code === "23505") {
                return {
                    status: "error",
                    message:
                        "This user is already invited or is already a member.",
                };
            }
            throw new Error(inviteError.message);
        }

        return { status: "success" };
    } catch (err) {
        console.error("inviteUser error:", err);
        return { status: "error", message: "Unexpected error occurred." };
    }
}

export async function acceptOrganizationInvitation(invitationId: number) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("organization_invitations")
            .update({
                status: "accepted",
                responded_at: new Date().toISOString(),
            })
            .eq("id", invitationId)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("acceptOrganizationInvitation error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}
