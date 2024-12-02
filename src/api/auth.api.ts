import {AxiosResponse} from 'axios';
import {AuthMeResponseType, instanse, LoginParamType, ResponseType} from 'api/todolists-api';

export const authAPI = {
    authMe() {
        return instanse.get<ResponseType<AuthMeResponseType>>("/auth/me");
    },
    login(data: LoginParamType) {
        return instanse.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginParamType
        >("/auth/login", data);
    },
    logout() {
        return instanse.delete<ResponseType>("/auth/login");
    },
};