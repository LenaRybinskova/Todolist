import { AxiosResponse } from "axios";
import {
  AuthMeResponseType,
  instanse,
  LoginParamType,
  ResponseType
} from "../../src/api/todolists-api";

export type MeResponseType = ResponseType<AuthMeResponseType>;

export const authApi = {
  authMe(): Promise<AxiosResponse<MeResponseType>>   {
    const res2 = instanse.get<ResponseType<AuthMeResponseType>>("/auth/me");
    return res2
  },
  login(
    data: LoginParamType
  ): Promise<AxiosResponse<ResponseType<{ userId: number }>>> {
    return instanse.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginParamType
    >("/auth/login", data);
  },
  logout(): Promise<AxiosResponse<ResponseType>> {
    return instanse.delete<ResponseType>("/auth/login");
  }
};
