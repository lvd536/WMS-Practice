export interface IAuthProps {
    name: string;
    email: string;
    password: string;
}

export interface ILoginProps {
    email: string;
    password: string;
}

export interface IUpdateUserResponse {
    message?: string;
    success?: boolean;
}

export interface IApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export interface IApiResponse<T> {
    data?: T;
    message?: string;
    success?: boolean;
    error?: string;
}

export interface IPaginatedResponse<T> {
    data: T[];
    count: number;
    page: number;
    limit: number;
}
