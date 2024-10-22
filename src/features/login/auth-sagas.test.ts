import { MeResponseType } from "../../api/auth-api";
import { authMeSaga } from "../../features/login/auth-sagas";
import {
  setAppStatusAC,
  setInitializedAC
} from "../../../src/AppWithRedux/app-reducer";
import { setLoginAC } from "../login/auth-reducer";
import { call, put, takeEvery } from "redux-saga/effects";
import { authApi } from "../../api/auth-api";
import { handleServerAppError } from "../../../src/utils/error-utils";

let meResponse: MeResponseType;

beforeEach(() => {
  meResponse = {
    resultCode: 0,
    data: {
      login: "",
      id: 123,
      email: ""
    },
    messages: [],
    fieldsErrors: []
  };
});

test("initializeAppWorkerSaga login success (if resultCode ===0) ", () => {
  const genetaror = authMeSaga();

  expect(genetaror.next().value).toEqual(put(setAppStatusAC("loading")));
  expect(genetaror.next().value).toEqual(call(authApi.authMe));
  expect(genetaror.next(meResponse).value).toEqual(put(setLoginAC(true)));
  expect(genetaror.next().value).toEqual(put(setAppStatusAC("succeeded")));
  expect(genetaror.next().value).toEqual(put(setInitializedAC(true)));
  expect(genetaror.next().done).toBe(true);
});
