export interface IUserProfile {
    id: string;

    name: string;

    phone?: string | null;
    about?: string | null;

    avatar_path?: string | null;
    background_path?: string | null;

    avatar_url?: string | null;
    background_url?: string | null;

    created_at: string;
    updated_at?: string | null;
}

export interface IUserPreview {
    id: string;
    name: string;
    avatar_path?: string | null;
    avatar_url?: string | null;
}

export interface IUserSession {
    id: string;
    email: string;
    name?: string | null;
    isAuthenticated: boolean;
}

export interface IUpdateProfileData {
    name?: string;
    email?: string;
    phone?: string;
    about?: string;

    avatar?: File | null;
    background?: File | null;
}
