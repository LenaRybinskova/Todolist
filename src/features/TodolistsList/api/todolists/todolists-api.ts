import {TaskPriorities, TaskStatuses} from 'common/enums/enums';
import {instanse} from 'common/instance/instance';
import { BaseResponse } from 'common/types';


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

export type AuthMeResponseType = {
    id: number;
    email: string;
    login: string;
};

export type AddTaskArgs = {
    title: string;
    todolistId: string;
};

export type UpdateTaskArgs = {
    todolistId: string;
    taskId: string;
    model: UpdateTaskModelType;
};

export type RemoveTaskArgs = {
    todolistId: string;
    taskId: string;
};


export const todolistAPI = {
    getTodolists() {
        return instanse.get<TodolistType[]>('/todo-lists');
    },
    createTodolist(title: string) {
        return instanse.post<BaseResponse<{ item: TodolistType }>>('/todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<BaseResponse>(`/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<BaseResponse>(`/todo-lists/${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instanse.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instanse.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title});
    },
    deleteTask(arg: RemoveTaskArgs) {
        const {todolistId, taskId} = arg;
        return instanse.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(arg: UpdateTaskArgs) {
        const {taskId, todolistId, model} = arg;
        return instanse.put<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};


