import {baseApi} from 'api/base-api';
import {AuthMeResponseType, LoginParamType, ResponseType} from 'api/todolists-api';

export const loginApi=baseApi.injectEndpoints({
    endpoints:(build)=>{
       return {
           authMe:build.query<ResponseType<AuthMeResponseType>, void>({
               query: ()=>{
                   return {
                       url:"/auth/me",
                       method: 'GET'
                   }
               }
           }),
           login:build.mutation<ResponseType<{ userId: number }>, LoginParamType>({
               query: (data)=>{
                   return {
                       url:"/auth/login",
                       method: 'POST',
                       body:data
                   }
               }
           }),
           logout:build.mutation<ResponseType, void>({
               query: ()=>{
                   return {
                       url:"/auth/login",
                       method: 'DELETE',
                   }
               }
           }),
       }
    },
    overrideExisting: true,
})



export const {useLoginMutation, useAuthMeQuery, useLogoutMutation}  = loginApi

