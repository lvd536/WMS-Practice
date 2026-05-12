export interface IUserProfile {
    id: string | null;
    name: string | null;
    phone: string | null;
    about: string | null;
    avatar_path: string | null;
    background_path?: string | null;
    created_at: string;
    updated_at: string;
}
export interface IUpdateProfileData {
    name?: string;
    email?: string;
    phone?: string;
    about?: string;

    avatar?: File | null;
    background?: File | null;
}
