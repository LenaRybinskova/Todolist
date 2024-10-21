import {AppRootStateType} from './../AppWithRedux/store';
import {CreateTodolistACType, GetTodolistACType, RemoveTodolistActionType} from './todolists-reducer';
import {
  GetTaskResponseType,
  ResponseType,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType
} from '../api/todolists-api';
import {setAppStatusAC} from '../AppWithRedux/app-reducer';
import {handleServerAppError} from '../utils/error-utils';
import {AxiosResponse} from 'axios';
import {call, put, select} from 'redux-saga/effects';
import {handleServerNetworkError} from '../../src/utils/error-utils';

// isDone заменили на status, у новых тасок по умолчанию priority: TaskPriorities.Low
const initialState = {
  /*  [todolistId1]: [
          {
              id: v1(),
              title: 'CSS',
              status: TaskStatuses.New,
              description: '',
              todoListId: todolistId1,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          },
          {
              id: v1(),
              title: 'JS',
              status: TaskStatuses.Completed,
              description: '',
              todoListId: todolistId1,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          },
          {
              id: v1(),
              title: 'React',
              status: TaskStatuses.New,
              description: '',
              todoListId: todolistId1,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          },
          {
              id: v1(),
              title: 'Redux',
              status: TaskStatuses.New,
              description: '',
              todoListId: todolistId1,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          }
      ],
      [todolistId2]: [
          {
              id: v1(),
              title: 'milk',
              status: TaskStatuses.Completed,
              description: '',
              todoListId: todolistId2,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          },
          {
              id: v1(),
              title: 'bread',
              status: TaskStatuses.Completed,
              description: '',
              todoListId: todolistId2,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          },
          {
              id: v1(),
              title: 'cheese',
              status: TaskStatuses.New,
              description: '',
              todoListId: todolistId2,
              order: 0,
              priority: TaskPriorities.Low,
              startDate: '',
              deadline: '',
              addedDate: ''
          }
      ]*/
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      const copyState = { ...state };
      action.todolists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    case "GET-TASKS":
      return { ...state, [action.tlId]: action.tasks };
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (tl) => tl.id !== action.taskId
        )
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId]
        ]
      };
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        )
      };
    case "CREATE-TODOLIST":
      return { ...state, [action.todolist.id]: [] };
    case "REMOVE-TODOLIST": {
      let copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

//action
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: "REMOVE-TASK", todolistId, taskId } as const;
};
export const addTaskAC = (task: TaskType) => {
  return { type: "ADD-TASK", task } as const;
};
export const getTasksAC = (tasks: TaskType[], tlId: string) => {
  return {
    type: "GET-TASKS",
    tlId,
    tasks
  } as const;
};
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateTaskDomainType
) => {
  return {
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model
  } as const;
};

export const getTask = (tlId: string) => ({
  type: "TASKS/FETCH-TASKS-SAGA",
  tlId
});

export function* fetchTasksSaga(action: ReturnType<typeof getTask>) {
  try {
    yield put(setAppStatusAC("loading"));
    const res: AxiosResponse<GetTaskResponseType> = yield call(
      todolistAPI.getTasks,
      action.tlId
    );
    if (!res.data.error) {
      yield put(getTasksAC(res.data.items, action.tlId));
      yield put(setAppStatusAC("succeeded"));
    } else {
      yield handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const addTask = (title: string, todolistId: string) => ({
  type: "TASKS/ADD-TASK-SAGA",
  title,
  todolistId
});

export function* addTaskSaga(action: ReturnType<typeof addTask>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(
      todolistAPI.createTask,
      action.todolistId,
      action.title
    );
    if (res.data.resultCode === 0) {
      yield put(addTaskAC(res.data.data.item));
      yield put(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const removeTask = (taskId: string, todolistId: string) => ({
  type: "TASKS/REMOVE-TASK-SAGA",
  taskId,
  todolistId
});

export function* removeTaskSaga(action: ReturnType<typeof removeTask>) {
  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.deleteTask,
      action.todolistId,
      action.taskId
    );
    if (res.data.resultCode === 0) {
      yield put(removeTaskAC(action.taskId, action.todolistId));
      yield put(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

export const updateTask = (
  todolistId: string,
  taskId: string,
  model: UpdateTaskDomainType
) => ({ type: "TASKS/UPDATE-TASK-SAGA", todolistId, taskId, model });

export const getTaskSSS = (
  state: AppRootStateType,
  todolistId: string,
  taslId: string
) => {
  return state.tasks[todolistId].find((t) => t.id === taslId);
};

export function* updateTaskSaga(action: ReturnType<typeof updateTask>) {
  const task: TaskType = yield select(
    getTaskSSS,
    action.todolistId,
    action.taskId
  );
  if (!task) {
    return;
  }

  const apiModel: UpdateTaskModelType = {
    title: task.title,
    status: task.status,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    order: task.order,
    ...action.model
  };

  yield put(setAppStatusAC("loading"));
  try {
    const res: AxiosResponse<ResponseType> = yield call(
      todolistAPI.updateTask,
      action.todolistId,
      action.taskId,
      apiModel
    );

    if (res.data.resultCode === 0) {
      yield put(updateTaskAC(action.todolistId, action.taskId, action.model));
      yield put(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data);
    }
  } catch (e) {
    yield handleServerNetworkError(e as { message: string });
  }
}

//types
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type TasksActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | RemoveTodolistActionType
  | GetTodolistACType
  | ReturnType<typeof getTasksAC>
  | CreateTodolistACType;

export type UpdateTaskDomainType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
