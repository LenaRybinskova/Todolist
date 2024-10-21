import {AxiosResponse} from 'axios';
import {AuthMeResponseType, instanse, LoginParamType, ResponseType} from '../../src/api/todolists-api';

export const authApi = {
    authMe(): Promise<AxiosResponse<ResponseType<AuthMeResponseType>>> {
        const res = instanse.get<ResponseType<AuthMeResponseType>>('/auth/me');
        return res;
    },
    login(data: LoginParamType): Promise<AxiosResponse<ResponseType<{ userId: number }>>> {
        return instanse.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginParamType
        >('/auth/login', data);
    },
    logout(): Promise<AxiosResponse<ResponseType>> {
        return instanse.delete<ResponseType>('/auth/login');
    }
};