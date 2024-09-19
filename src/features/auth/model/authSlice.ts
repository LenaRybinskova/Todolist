import {authAPI} from 'features/auth/api/authApi';
import {appActions} from 'app/appSlice';
import {createSlice, isFulfilled, PayloadAction} from '@reduxjs/toolkit';
import {clearState} from 'common/actions/common.actions';
import {createAppAsyncThunks} from 'common/utils';
import {ResultCode} from 'common/enums';
import {LoginParamType} from 'features/auth/api/authApi.types';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            isFulfilled(authMe, login, logout),
            (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
    selectors: {
        selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
    },
});

export const authReducer = authSlice.reducer;
export type authInitialState = ReturnType<typeof authSlice.getInitialState>;
export const {selectIsLoggedIn} = authSlice.selectors;


//TC
export const authMe = createAppAsyncThunks<{ isLoggedIn: boolean }, undefined>
(`${authSlice.name}/authMe`,
    async (_, thunkAPI) => {
        const res = await authAPI.authMe()
            .finally(() => {
                thunkAPI.dispatch(appActions.setInitialized({isInitialized: true}))
            });
        if (res.data.resultCode === ResultCode.Success) {//если 0, значит кука есть и значит делаем isLoggedIn = true
            return {isLoggedIn: true}
        } else {
            return thunkAPI.rejectWithValue(res.data)
        }
    })

export const login = createAppAsyncThunks<{
    isLoggedIn: boolean
}, LoginParamType>(`${authSlice.name}/login`, async (args, thunkAPI) => {
    const res = await authAPI.login(args);
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true}
    } else {
        return thunkAPI.rejectWithValue(res.data) // BaseResponseType в addMatcher '/rejected
    }
})

export const logout = createAppAsyncThunks<{
    isLoggedIn: boolean
}, undefined>(`${authSlice.name}/logout`, async (_, thunkAPI) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
        thunkAPI.dispatch(clearState());
        return {isLoggedIn: false}
    } else {
        return thunkAPI.rejectWithValue(res.data)
    }
})

export const appThunks = {login, logout, authMe}


/*
//REDUX
import {authAPI, LoginParamType} from '../../api/todolistsList-api';
import {AppThunk} from '../../app/store';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setAppStatusAC, setInitializedAC} from '../../app/app-reducer';

const InitialState = {
    isLoggedIn: false
}

export const authSlice = (state: InitialStateType = InitialState, action: LoginActionType) => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//AC
export const setLoginAC = (value: boolean) => {
    return {type: 'AUTH/SET-IS-LOGGED-IN' as const, value}
}

//TC
export const authMeTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.authMe()
        //если 0, значит кука есть и значит делвем isLoggedIn = true
        if (res.data.resultCode === 0) {
            dispatch(setLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setInitializedAC(true))/!* чтобы мы проиниц приложение в любом случае*!/
    }
}

export const loginTC = (data: LoginParamType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.auth(data)
        if (res.data.resultCode === 0) {
            dispatch(setLoginAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setLoginAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}


type InitialStateType = typeof InitialState
export type SetLoginACType = ReturnType<typeof setLoginAC>
export type LoginActionType = SetLoginACType*/
