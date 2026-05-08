export interface IUserProfile {
    name: string | null;
    email: string | null;
    phone: string | null;
    about: string | null;
    avatar_url: string | null;
    background_url?: string | null;
}
export interface IUpdateProfileData {
    name?: string;
    email?: string;
    phone?: string;
    about?: string;

    avatar?: File | null;
    background?: File | null;
}
