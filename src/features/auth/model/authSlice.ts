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
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
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
export const authMe = createAppAsyncThunks<any, undefined>(`${authSlice.name}/authMe`, async (_, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.authMe();
        if (res.data.resultCode === ResultCode.Success) {//если 0, значит кука есть и значит делвем isLoggedIn = true
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, false); //false чтобы при аусМи юзеру не летела глоб ош что он не авторизовался
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
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
            console.log('login if')
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
            /*return {isLoggedIn: true}*/
        } else {
            const isShowAppGlobal = !res.data.fieldsErrors.length
            handleServerAppError(res.data, thunkAPI.dispatch, isShowAppGlobal);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null); // просто загрушка, тк вернуть что то надообязательно
    }
})

export const logout = createAppAsyncThunks<any, undefined>(`${authSlice.name}/logout`, async (_, thunkAPI) => {
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
