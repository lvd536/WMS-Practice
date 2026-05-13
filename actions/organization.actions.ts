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
