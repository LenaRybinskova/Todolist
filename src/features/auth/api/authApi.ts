import {instanse} from 'common/instance/instance';
import {BaseResponse} from 'common/types';
import {AxiosResponse} from 'axios';
import {AuthMeResponseType} from 'features/TodolistsList/todolists-api';
import {LoginParamType} from 'features/auth/api/authApi.types';


export const authAPI = {
    authMe() {
        return instanse.get<BaseResponse<AuthMeResponseType>>('/auth/me');
    },
    login(data: LoginParamType) {
        return instanse.post<
            BaseResponse<{ userId: number }>,
            AxiosResponse<BaseResponse<{ userId: number }>>,
            LoginParamType
        >('/auth/login', data);
    },
    logout() {
        return instanse.delete<BaseResponse>('/auth/login');
    },
};

