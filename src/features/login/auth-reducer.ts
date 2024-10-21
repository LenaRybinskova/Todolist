import {AxiosResponse} from 'axios';
import {authAPI, AuthMeResponseType, LoginParamType, ResponseType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setAppStatusAC, setInitializedAC} from '../../AppWithRedux/app-reducer';
import {call, put, takeEvery} from 'redux-saga/effects';

const InitialState = {
    isLoggedIn: false
};

export const authReducer = (
    state: InitialStateType = InitialState,
    action: LoginActionType
) => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};

//AC
export const setLoginAC = (value: boolean) => {
    return {type: 'AUTH/SET-IS-LOGGED-IN' as const, value};
};


type InitialStateType = typeof InitialState;
export type SetLoginACType = ReturnType<typeof setLoginAC>;
export type LoginActionType = SetLoginACType;
export type AuthActionsType = SetLoginACType | LoginActionType;
