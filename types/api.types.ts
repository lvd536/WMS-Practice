export interface IAuthProps {
    name: string;
    email: string;
    password: string;
}

export interface IUpdateUserResponse {
    message?: string;
    success?: boolean;
}
