import { IUser } from 'global';
import { RequestResponse } from 'umi-request';

import service from './index';

const baseUrl = process.env.REACT_APP_API_URL;

export interface GetUserRequestBody {}

export interface GetUserResponseBody {
    user: IUser;
}

export const getUser = (
    requestBody: GetUserRequestBody
): Promise<RequestResponse<GetUserResponseBody>> => {
    return service(`${baseUrl}/getUser`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface LoginResponseBody {
    user: IUser;
}

export const login = (
    requestBody: LoginRequestBody
): Promise<RequestResponse<LoginResponseBody>> => {
    return service(`${baseUrl}/login`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface RegisterRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
}

export interface RegisterResponseBody {
    user: IUser;
}

export const register = (
    requestBody: RegisterRequestBody
): Promise<RequestResponse<RegisterResponseBody>> => {
    return service(`${baseUrl}/register`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface GetCurrentUserResponseBody {
    user: IUser;
}

export const getCurrentUser = (): Promise<
    RequestResponse<GetCurrentUserResponseBody>
> => {
    return service(`${baseUrl}/getCurrentUser`, {
        method: 'GET',
    });
};
