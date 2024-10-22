import {call, put, takeEvery} from 'redux-saga/effects';
import {setAppStatusAC, setInitializedAC} from '../../AppWithRedux/app-reducer';
import {AxiosResponse} from 'axios';
import { AuthMeResponseType, LoginParamType, ResponseType} from '../../api/todolists-api';
import {authApi} from '../../../src/api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../../src/utils/error-utils';
import {setLoginAC} from '../login/auth-reducer';
import {MeResponseType} from "../../api/auth-api"


export const authMe = () => ({type: 'APP/INITIALIZE_APP_SAGA'});

export function* authMeSaga() {
    yield put(setAppStatusAC('loading'));
    try {
        const res: MeResponseType = yield call(
            authApi.authMe
        );
        if (res.resultCode === 0) {
            yield put(setLoginAC(true));
            yield put(setAppStatusAC('succeeded'));
        } else {
            yield handleServerAppError(res.data);
        }
    } catch (e) {
        yield handleServerNetworkError(e as { message: string });
    } finally {
        yield put(setInitializedAC(true));
    }
}

export const login = (data: LoginParamType) => {
    return {type: 'APP/LOGIN-SAGA', data}
}

export function* loginSaga(action: ReturnType<typeof login>) {
    yield put(setAppStatusAC('loading'))
    try {
        const res: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authApi.login, action.data)
        if (res.data.resultCode === 0) {
            yield put(setLoginAC(true));
            yield put(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string });
    }
}

export const logout = () => {
    return {type: 'AUTH/LOGOUT-SAGA'};
}

export function* logoutSaga() {
    yield put(setAppStatusAC('loading'));
    try {
        const res: AxiosResponse<ResponseType> = yield call(authApi.logout);
        if (res.data.resultCode === 0) {
            yield put(setLoginAC(false));
            yield put(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string });
    }
}

export function* authWatcherSaga() {
    yield takeEvery('APP/INITIALIZE_APP_SAGA', authMeSaga)
    yield takeEvery('AUTH/LOGOUT-SAGA', logoutSaga)
    yield takeEvery('APP/LOGIN-SAGA', loginSaga)
}