"use server";

import { createClient } from "@/lib/supabase/server";
import { IOrganization } from "@/types/organization.types";

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
