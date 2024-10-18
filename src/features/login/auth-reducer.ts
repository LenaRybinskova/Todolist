import { AxiosResponse } from "axios";
import { authAPI, LoginParamType } from "../../api/todolists-api";
import { AppThunk } from "../../AppWithRedux/store";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../../utils/error-utils";
import {
  setAppStatusAC,
  setInitializedAC
} from "../../AppWithRedux/app-reducer";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ResponseType, AuthMeResponseType } from "../../api/todolists-api";

const InitialState = {
  isLoggedIn: false
};

export const authReducer = (
  state: InitialStateType = InitialState,
  action: LoginActionType
) => {
  switch (action.type) {
    case "AUTH/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

//AC
export const setLoginAC = (value: boolean) => {
  return { type: "AUTH/SET-IS-LOGGED-IN" as const, value };
};

//TC
// export const authMeTC = (): AppThunk => async (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res:AxiosResponse<ResponseType<AuthMeResponseType>> = await authAPI.authMe()
//         console.log("authMeTC res", res)
//         if (res.data.resultCode === 0) {
//             dispatch(setLoginAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (e) {
//         handleServerNetworkError(e as { message: string }, dispatch)
//     } finally {
//         dispatch(setInitializedAC(true))
//     }
// }

export function* authMeSaga() {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType<AuthMeResponseType>> = yield call(
      authAPI.authMe
    );
    if (res.data.resultCode === 0) {
      yield put(setLoginAC(true));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  } finally {
    yield put(setInitializedAC(true));
  }
}

export const authMe = () => ({ type: "APP/INITIALIZE_APP_SAGA" });

export const loginTC =
  (data: LoginParamType): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(setLoginAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string });
    }
  };

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(setLoginAC(false));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string });
  }
};

type InitialStateType = typeof InitialState;
export type SetLoginACType = ReturnType<typeof setLoginAC>;
export type LoginActionType = SetLoginACType;
export type AuthActionsType = SetLoginACType | LoginActionType;
