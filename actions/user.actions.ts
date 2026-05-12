"use server";

import { createClient } from "@/lib/supabase/server";
import { IAuthProps } from "@/types/api.types";
import { IUpdateProfileData, IUserProfile } from "@/types/user.types";

export async function registerUser(userData: Omit<IAuthProps, "name">) {
    const supabase = await createClient();
    const { email, password } = userData;
    try {
        const res = await supabase.auth.signUp({
            email,
            password,
        });
        if (res.error) return { error: res.error.message };
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
export async function loginUser(userData: Omit<IAuthProps, "name">) {
    const supabase = await createClient();
    const { email, password } = userData;
    try {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (res.error) return { error: res.error.message };
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getUser() {
    const supabase = await createClient();
    try {
        const user = await supabase.auth.getUser();
        return user.data.user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getUserProfile(userId: string) {
    const supabase = await createClient();
    try {
        const profile = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle();
        if (profile.success) return profile.data as IUserProfile;
        else return { error: profile.error };
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function updateUserProfile(
    data: IUpdateProfileData,
    userId: string,
) {
    try {
        const supabase = await createClient();

        let avatarUrl: string | undefined;
        let backgroundUrl: string | undefined;

        if (data.avatar) {
            const path = `${userId}/avatar-${Date.now()}`;
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(path, data.avatar, { upsert: true });

            if (uploadError) {
                return {
                    status: "error",
                    error: { message: uploadError.message },
                };
            }

            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(path);
            avatarUrl = urlData.publicUrl;
        }

        if (data.background) {
            const path = `${userId}/background-${Date.now()}`;
            const { error: uploadError } = await supabase.storage
                .from("backgrounds")
                .upload(path, data.background, { upsert: true });

            if (uploadError) {
                return {
                    status: "error",
                    error: { message: uploadError.message },
                };
            }

            const { data: urlData } = supabase.storage
                .from("backgrounds")
                .getPublicUrl(path);
            backgroundUrl = urlData.publicUrl;
        }

        const updateData: Record<string, unknown> = {};
        if (data.name) updateData.name = data.name;
        if (data.phone) updateData.phone = data.phone;
        if (data.about) updateData.about = data.about;
        if (avatarUrl) updateData.avatar_path = avatarUrl;
        if (backgroundUrl) updateData.background_path = backgroundUrl;

        const { data: updated, error: updateError } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("id", userId)
            .select()
            .single();

        if (updateError) {
            return {
                status: "error",
                error: { message: updateError.message },
            };
        }

        return { status: "success", data: updated };
    } catch (err) {
        console.error("updateUserProfile error:", err);
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
