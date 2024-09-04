import {authInitialState, authMe, authReducer, login, logout} from 'features/auth/model/authSlice';

import {TestAction} from 'common/types';

let startState: authInitialState;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    };
});

test('isLoggedIn  should be true on authMe fulfilled', () => {

    const action: TestAction<typeof authMe.fulfilled> = {
        type: authMe.fulfilled.type,
        payload: {
            isLoggedIn: true
        }
    }
    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBe(true);
});

test('isLoggedIn  should be true on login fulfilled', () => {

    const action: TestAction<typeof login.fulfilled> = {
        type: login.fulfilled.type,
        payload: {
            isLoggedIn: true
        }
    }
    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBe(true);
});

test('isLoggedIn  should be true on logout fulfilled', () => {

    const action: TestAction<typeof logout.fulfilled> = {
        type: logout.fulfilled.type,
        payload: {
            isLoggedIn: false
        }
    }
    const endState = authReducer(startState, action);
    expect(endState.isLoggedIn).toBe(false);
});