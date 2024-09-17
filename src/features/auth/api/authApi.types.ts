export type LoginParamType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: boolean;
};

export type AuthMeResponseType = {
    id: number;
    email: string;
    login: string;
};