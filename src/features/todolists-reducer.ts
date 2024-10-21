import { EditableSpanWorkStory } from "./../components/EditableSpan/EditableSpan.stories";
import { ErrorAddItemFormStory } from "./../components/AddItemsForm/AddItemForm.stories";
import { ResponseType, todolistAPI, TodolistType } from "../api/todolists-api";
import { AppRootStateType, AppThunk } from "../AppWithRedux/store";
import { RequestStatusType, setAppStatusAC } from "../AppWithRedux/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";

const initialState: TodolistDomainType[] = [
  /*    {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}*/
];
export const todolistsReducer = (
  state = initialState,
  action: TodolistsActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle"
      }));
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "UPDATE-TODOLIST":
      return [
        ...state.map((tl) =>
          tl.id === action.todolistId ? { ...tl, ...action.model } : tl
        )
      ];
    case "CREATE-TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state
      ];
    case "CHANGE-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    default:
      return state;
  }
};

//actions
export const getTodolistAC = (todolists: TodolistType[]) => {
  return {
    type: "SET-TODOLISTS",
    todolists
  } as const;
};
export const createTodolistAC = (todolist: TodolistType) => {
  return { type: "CREATE-TODOLIST", todolist } as const;
};
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", id: todolistId } as const;
};
export const updateTodolistAC = (
  todolistId: string,
  model: TodolistDomainModelType
) => {
  return { type: "UPDATE-TODOLIST", todolistId, model } as const;
};
export const changeTodolistEntityStatusAC = (
  id: string,
  entityStatus: RequestStatusType
) => {
  return { type: "CHANGE-ENTITY-STATUS", id, entityStatus } as const;
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
) => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter } as const;
};

//Sagas
export const getTodolists = () => {
  return { type: "TODOLISTS/FETCH-TODOLISTS-SAGA" };
};

export function* fetchTodolistsSaga(action: ReturnType<typeof getTodolists>) {
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
    if (res.status === 200) {
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
      handleServerAppError(res.data);
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError<ResponseErrorType>);
  }
}

export const updateTodolist = (
  todolistId: string,
  model: TodolistDomainModelType
) => {
  return { type: "TODOLISTS/UPDATE-TODOLISTS-SAGA", todolistId, model };
};

export const selectTodolist = (state: AppRootStateType, todolistId: string) => {
  return state.todolists.filter((tl) => tl.id === todolistId);
};

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
      handleServerAppError(res.data);
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ResponseErrorType>);
  }
}

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type GetTodolistACType = ReturnType<typeof getTodolistAC>;
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistFilterACType = ReturnType<
  typeof changeTodolistFilterAC
>;

export type TodolistsActionsType =
  | RemoveTodolistActionType
  | GetTodolistACType
  | ReturnType<typeof updateTodolistAC>
  | CreateTodolistACType
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ChangeTodolistFilterACType;

type TodolistDomainModelType = {
  id?: string;
  addedDate?: string;
  order?: number;
  title?: string;
  filter?: FilterValuesType;
};
export type ResponseErrorType = {
  resultCode: number;
  messages: string[];
  data: {};
};

/*export const _createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title).then(res => {
        //пример, когда сервер возвращает нам созданный ТЛ целиком и мы его диспатчим в редьюсор.
        dispatch(createTodolistAC(res.data.data.item))
        /!*            // примет, когда санка возвращает и диспатчит санку. Те новый ТЛ создался и мы просто вызываем ТС со всеми ТЛ и опи отрисовываются.
                    dispatch(getTodolistsTC())*!/
    })
}*/
