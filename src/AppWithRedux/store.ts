import {all} from 'redux-saga/effects';
import {TasksActionsType, tasksReducer} from '../features/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/todolists-reducer';
import {tasksWatcherSaga} from '../features/tasks-sagas';
import {todolistsWatcherSaga} from '../features/todolists-sagas';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionType, appReducer} from './app-reducer';
import {authReducer} from '../features/login/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import {authWatcherSaga} from '../features/login/auth-sagas';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = legacy_createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

function* rootWatcher() {
    yield all([authWatcherSaga(), tasksWatcherSaga(), todolistsWatcherSaga()]); // all чтобы параллельно запуск Саги
    // yield fork(authWatcherSaga)
    // yield fork(tasksWatcherSaga)
    // yield fork(todolistsWatcherSaga)
}

sagaMiddleware.run(rootWatcher);

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppActionsType =
    | TodolistsActionsType
    | TasksActionsType
    | AppActionType
    | AnyAction;

export type AppDispatchType = ThunkDispatch<
    AppRootStateType,
    unknown,
    AppActionsType
>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType
>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
    useSelector;

// @ts-ignore
window.store = store;
