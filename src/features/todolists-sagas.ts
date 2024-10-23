import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { ResponseType, todolistAPI, TodolistType } from "../api/todolists-api";
import { setAppStatusAC } from "../AppWithRedux/app-reducer";
import {
  changeTodolistEntityStatusAC,
  createTodolistAC,
  getTodolistAC,
  removeTodolistAC,
  TodolistDomainModelType,
  updateTodolistAC
} from "./todolists-reducer";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";
import { selectTodolist } from "../../src/features/TodolistList/todolist-selectors";

export const getTodolists = () => {
  return { type: "TODOLISTS/FETCH-TODOLISTS-SAGA" };
};

export function* fetchTodolistsSaga() {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<TodolistType[]> = yield call(
      todolistAPI.getTodolists
    );
    if (res.status === 200) {
      yield put(getTodolistAC(res.data));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const createTodolist = (title: string) => {
  return { type: "TODOLISTS/CREATE-TODOLISTS-SAGA", title };
};

export function* createTodolistSaga(action: ReturnType<typeof createTodolist>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType<{ item: TodolistType }>> = yield call(
      todolistAPI.createTodolist,
      action.title
    );
    if (res.data.resultCode  === 0) {
      yield put(createTodolistAC(res.data.data.item));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const removeTodolist = (todolistId: string) => {
  return { type: "TODOLISTS/DELETE-TODOLISTS-SAGA", todolistId };
};

export function* removeTodolistSaga(action: ReturnType<typeof removeTodolist>) {
  yield put(setAppStatusAC("loading"));
  yield put(changeTodolistEntityStatusAC(action.todolistId, "loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.deleteTodolist,
      action.todolistId
    );
    if (res.data.resultCode === 0) {
      yield put(removeTodolistAC(action.todolistId));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const updateTodolist = (
  todolistId: string,
  model: TodolistDomainModelType
) => {
  return { type: "TODOLISTS/UPDATE-TODOLISTS-SAGA", todolistId, model };
};

/*export const selectTodolist = (state: AppRootStateType, todolistId: string) => {
  return state.todolists.filter((tl) => tl.id === todolistId);
};*/

export function* updateTodolistSaga(action: ReturnType<typeof updateTodolist>) {
  const todolist: TodolistType = yield select(
    selectTodolist,
    action.todolistId
  );

  if (!todolist) {
    console.log("todolist is not exist");
    return;
  }

  const modelApi = {
    id: todolist.id,
    addedDate: todolist.addedDate,
    order: todolist.order,
    title: todolist.title,
    ...action.model
  };

  yield put(setAppStatusAC("loading"));

  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.updateTodolist,
      action.todolistId,
      modelApi.title
    );
    if (res.data.resultCode === 0) {
      yield put(updateTodolistAC(action.todolistId, action.model));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export function* todolistsWatcherSaga() {
  yield takeEvery("TODOLISTS/FETCH-TODOLISTS-SAGA", fetchTodolistsSaga);
  yield takeEvery("TODOLISTS/CREATE-TODOLISTS-SAGA", createTodolistSaga);
  yield takeEvery("TODOLISTS/DELETE-TODOLISTS-SAGA", removeTodolistSaga);
  yield takeEvery("TODOLISTS/UPDATE-TODOLISTS-SAGA", updateTodolistSaga);
}
