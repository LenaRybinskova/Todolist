import axios, { AxiosResponse } from "axios";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type TaskType = {
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};
type ResponseType<T = {}> = {
  data: T;
  resultCode: number;
  fieldsErrors: string[];
  messages: string[];
};
type GetTaskResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export type UpdateTaskModelType = {
  title: string | null;
  description: string | null;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  order: number | null;
};
export type LoginParamType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};
export type AuthMeResponseType = {
  id: number;
  email: string;
  login: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi,
  Ungently,
  Later = 4,
}

const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: { "API-KEY": "2c45728a-68be-4862-8b0c-8cd42989c7e6" },
});

export const todolistAPI = {
  getTodolists() {
    return instanse.get<TodolistType[]>("/todo-lists");
  },
  createTodolist(title: string) {
    return instanse.post<ResponseType<{ item: TodolistType }>>("/todo-lists", { title });
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<ResponseType>(`/todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instanse.put<ResponseType>(`/todo-lists/${todolistId}`, { title });
  },
  getTasks(todolistId: string) {
    return instanse.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instanse.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instanse.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

export const authAPI = {
  authMe() {
    return instanse.get<ResponseType<AuthMeResponseType>>("/auth/me");
  },
  login(data: LoginParamType) {
    return instanse.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginParamType
    >("/auth/login", data);
  },
  logout() {
    return instanse.delete<ResponseType>("/auth/login");
  },
};
