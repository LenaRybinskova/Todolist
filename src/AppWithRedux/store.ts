import { takeEvery } from "redux-saga/effects";
import { TasksActionsType, tasksReducer } from "../features/tasks-reducer";
import {
  TodolistsActionsType,
  todolistsReducer
} from "../features/todolists-reducer";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore
} from "redux";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppActionType, appReducer } from "./app-reducer";
import { authReducer, AuthActionsType } from "../features/login/auth-reducer";
import createSagaMiddleware from "redux-saga";
import { authMeSaga } from "../features/login/auth-reducer";
import { fetchTasksSaga } from "../features/tasks-reducer";
import { addTaskSaga, removeTaskSaga, updateTaskSaga } from "../features/tasks-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk, sagaMiddleware)
);

function* rootWatcher() {
  yield takeEvery("APP/INITIALIZE_APP_SAGA", authMeSaga);
  yield takeEvery("TASKS/FETCH-TASKS-SAGA", fetchTasksSaga);
  yield takeEvery("TASKS/ADD-TASK-SAGA", addTaskSaga);
  yield takeEvery("TASKS/REMOVE-TASK-SAGA", removeTaskSaga);
  yield takeEvery("TASKS/UPDATE-TASK-SAGA", updateTaskSaga);
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
