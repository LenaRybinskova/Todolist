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
