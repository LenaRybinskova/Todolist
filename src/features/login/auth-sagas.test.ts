import {authApi, MeResponseType} from '../../api/auth-api';
import {authMeSaga} from '../../features/login/auth-sagas';
import {setAppErrorAC, setAppStatusAC, setInitializedAC} from '../../../src/AppWithRedux/app-reducer';
import {setLoginAC} from '../login/auth-reducer';
import {call, put} from 'redux-saga/effects';
import {handleServerAppError} from '../../utils/error-utils';

let meResponse: MeResponseType;

beforeEach(() => {
    meResponse = {
        resultCode: 0,
        data: {
            login: '',
            id: 123,
            email: ''
        },
        messages: [],
        fieldsErrors: []
    };
});

test('initializeAppWorkerSaga login success (if resultCode ===0) ', () => {
    const genetaror = authMeSaga();

    expect(genetaror.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genetaror.next().value).toEqual(call(authApi.authMe));
    expect(genetaror.next(meResponse).value).toEqual(put(setLoginAC(true)));
    expect(genetaror.next().value).toEqual(put(setAppStatusAC('succeeded')));
    expect(genetaror.next().value).toEqual(put(setInitializedAC(true)));
    expect(genetaror.next().done).toBe(true);
});

test('initializeAppWorkerSaga login unsuccess (if resultCode ===1) ', () => {
   /* const genetaror = authMeSaga();

    expect(genetaror.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(genetaror.next().value).toEqual(call(authApi.authMe));


    const meResponseUnsuccess = {
        resultCode: 1,
        data: {
            login: '',
            id: 123,
            email: ''
        },
        messages: ["some error"],
        fieldsErrors: []
    };

    expect(genetaror.next(meResponseUnsuccess).value).toEqual(put(setAppErrorAC(meResponseUnsuccess.messages[0])));
*/

});
