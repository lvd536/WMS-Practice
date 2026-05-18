"use server";
import { createClient } from "@/lib/supabase/server";
import { IMember } from "@/types/warehouse.types";
import { revalidatePath } from "next/cache";

export async function getOrganizationMembers(orgId: number) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("organization_members")
            .select(`id, role, created_at, profiles(id, name, avatar_path)`)
            .eq("organization_id", orgId);

        if (error) throw new Error(error.message);

        return data as unknown as IMember[];
    } catch (err) {
        console.error("getOrganizationMembers error:", err);
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

export async function updateMemberRole(memberId: number, role: string) {
    const supabase = await createClient();

    await supabase
        .from("organization_members")
        .update({ role })
        .eq("id", memberId);

    revalidatePath(`/organizations/[organizationId]/warehouses`, "page");

    return { status: "success" };
}

export async function removeMember(memberId: number) {
    const supabase = await createClient();

    await supabase.from("organization_members").delete().eq("id", memberId);

    revalidatePath(`/organizations/[organizationId]/warehouses`, "page");

    return { status: "success" };
}
