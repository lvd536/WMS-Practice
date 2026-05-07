"use server";

import { IAuthProps } from "@/types/api.types";
import axios from "axios";

const dbPath = `${process.env.DB_BASE}:${process.env.DB_PORT}`;

export async function registerUser(userData: IAuthProps) {
    try {
        const resp = await axios.post(dbPath + "/auth/register", userData);
        console.log(resp.data);
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
        const resp = await axios.post(dbPath + "/auth/login", userData);
        console.log(resp.data);
        if (resp.status === 200 && resp.data) {
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

export async function getUserProfile() {}
export async function setUserProfile() {}
