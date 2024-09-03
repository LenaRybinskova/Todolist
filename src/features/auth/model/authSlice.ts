import {authAPI} from 'features/auth/api/authApi';
import {handleServerNetworkError} from 'common/utils/handleServerNetworkError';
import {appActions} from 'app/appSlice';
import {createSlice} from '@reduxjs/toolkit';
import {clearState} from 'common/actions/common.actions';
import {handleServerAppError} from 'common/utils/handleServerAppError';
import {createAppAsyncThunks} from 'common/utils';
import {ResultCode} from 'common/enums';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        /*        setLogin: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                },*/
    },
    extraReducers: (builder) => {
        builder.addCase(authMe.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
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

export const authMe = createAppAsyncThunks<any, null>(`${authSlice.name}/authMe`, async (args, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.authMe();
        if (res.data.resultCode === ResultCode.Success) {//если 0, значит кука есть и значит делвем isLoggedIn = true
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, thunkAPI.dispatch);
    } finally {
        thunkAPI.dispatch(appActions.setInitialized({isInitialized: true}));
        /*/!* чтобы мы проиниц приложение в любом случае*!/*/
    }
})

export const login = createAppAsyncThunks<any, any>(`${authSlice.name}/login`, async (args, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(args);
        if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
            /*return {isLoggedIn: true}*/
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null); // просто загрушка, тк вернуть что то надообязательно

    }
})

export const logout = createAppAsyncThunks<any, null>(`${authSlice.name}/logout`, async (args, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(clearState());
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
            /*return {isLoggedIn: false}*/
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, thunkAPI.dispatch);
    }
})

/*export const authMeTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.authMe();
        //если 0, значит кука есть и значит делвем isLoggedIn = true
        if (res.data.resultCode === 0) {
            dispatch(authActions.setLogin({isLoggedIn: true}));
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch);
    } finally {
        dispatch(appActions.setInitialized({isInitialized: true})); /!* чтобы мы проиниц приложение в любом случае*!/
    }
};*/

/*export const loginTC =
    (data: LoginParamType): AppThunk =>
        async (dispatch) => {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            try {
                const res = await authAPI.login(data);
                if (res.data.resultCode === 0) {
                    dispatch(authActions.setLogin({isLoggedIn: true}));
                    dispatch(appActions.setAppStatus({status: 'succeeded'}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            } catch (e) {
                handleServerNetworkError(e as { message: string }, dispatch);
            }
        };*/

/*export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(authActions.setLogin({isLoggedIn: false}));
            dispatch(clearState());
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch);
    }
};*/

/*
//REDUX
import {authAPI, LoginParamType} from '../../api/todolists-api';
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
