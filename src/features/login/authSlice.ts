import { authAPI, LoginParamType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { appActions } from "AppWithRedux/appSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { AppThunk } from "AppWithRedux/store";
import { todolistsActions } from "features/todolistSlice";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoggedIn = action.payload.value;
    },
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export type authInitialState = ReturnType<typeof authSlice.getInitialState>;
export const selectIsLoggedIn = authSlice.selectors;

//TC
export const authMeTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.authMe();
    //если 0, значит кука есть и значит делвем isLoggedIn = true
    if (res.data.resultCode === 0) {
      dispatch(authActions.setLogin({ value: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  } finally {
    dispatch(appActions.setInitialized({ isInitialized: true })); /* чтобы мы проиниц приложение в любом случае*/
  }
};

export const loginTC =
  (data: LoginParamType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(authActions.setLogin({ value: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    }
  };

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setLogin({ value: false }));
      dispatch(todolistsActions.clearState());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};

/*
//REDUX
import {authAPI, LoginParamType} from '../../api/todolists-api';
import {AppThunk} from '../../AppWithRedux/store';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setAppStatusAC, setInitializedAC} from '../../AppWithRedux/app-reducer';

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
        const res = await authAPI.login(data)
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
