"use server";

import { api } from "@/lib/axios";
import { IAuthProps, IUpdateUserResponse } from "@/types/api.types";
import { IUpdateProfileData, IUserProfile } from "@/types/user.types";

const dbPath = `${process.env.DB_BASE}:${process.env.DB_PORT}`;

export async function registerUser(userData: IAuthProps) {
    try {
        const resp = await api.post(dbPath + "/auth/register", userData);
        if (resp.status === 201 && resp.data) {
            return resp.data;
        } else
            throw new Error(
                "errors" in resp.data
                    ? (resp.data.errors[0] as [])
                    : "message" in resp.data
                      ? resp.data.message
                      : "Unhandled error",
            );
    } catch (e) {
        console.error(e);
    }
}
export async function loginUser(userData: Omit<IAuthProps, "name">) {
    try {
        const resp = await api.post(dbPath + "/auth/login", userData);
        if (resp.status === 200 && resp.data) {
            return resp.data;
        } else
            throw new Error(
                "errors" in resp.data
                    ? resp.data.errors[0]
                    : "message" in resp.data
                      ? resp.data.message
                      : "Unhandled error",
            );
    } catch (e) {
        console.error(e);
    }
}

export async function getUserProfile(token: string) {
    try {
        const resp = await api.get(dbPath + "/profile", {
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : undefined,
        });
        if (resp.status === 200 && resp.data) {
            return resp.data.data as IUserProfile;
        }

        throw new Error(
            "errors" in resp.data
                ? resp.data.errors[0]
                : "message" in resp.data
                  ? resp.data.message
                  : "Unhandled error",
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function updateUserProfile(
    data: IUpdateProfileData,
    token: string,
) {
    const formData = new FormData();

    if (data.name) {
        formData.append("name", data.name);
    }

    if (data.email) {
        formData.append("email", data.email);
    }

    if (data.phone) {
        formData.append("phone", data.phone);
    }

    if (data.about) {
        formData.append("about", data.about);
    }

    if (data.avatar) {
        formData.append("avatar", data.avatar);
    }

    if (data.background) {
        formData.append("background", data.background);
    }

    const resp = await api.post(dbPath + "/profile/profile-edit", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return resp.data as IUpdateUserResponse;
}
