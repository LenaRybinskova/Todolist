import axios from 'axios';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {TodolistDomainType} from 'features/todolistSlice';

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
export type ResponseType<T = {}> = {
    data: T;
    resultCode: number;
    fieldsErrors: string[];
    messages: string[];
};
export type GetTaskResponseType = {
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


export const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    // headers: {'API-KEY': '2c45728a-68be-4862-8b0c-8cd42989c7e6'},
});

export const todolistAPI = {
    getTodolists() {
        return instanse.get<TodolistType[]>('/todo-lists');
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title});
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<ResponseType>(`/todo-lists/${todolistId}`, {title});
    },
};

export const todolistsApi = createApi({
    reducerPath: 'todolists',
    tagTypes: ["Todolist"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('API-KEY', '2c45728a-68be-4862-8b0c-8cd42989c7e6')
        }
    }),
    endpoints: (build) => {
        return {
            getTodolists: build.query<TodolistDomainType[], void>({
                query: () => {
                    return {
                        url: '/todo-lists',
                        method: 'GET'
                    }
                },
                transformResponse(todolists: TodolistType[]): TodolistDomainType[] {
                    return todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
                },
                providesTags:["Todolist"]
            }),
            addTodolist: build.mutation<ResponseType<{ item: TodolistType }>, string>({
                query: (title) => {
                    return {
                        url: '/todo-lists',
                        method: 'POST',
                        body: title
                    }
                },
                invalidatesTags:["Todolist"]
            }),
            deleteTodolist: build.mutation<ResponseType, string>({
                query: (tlId) => {
                    return {
                        url: '/todo-lists',
                        method: 'DELETE',
                        body: tlId
                    }
                },
                invalidatesTags:["Todolist"]
            }),
            updateTodolist: build.mutation<ResponseType, {id: string, title: string}>({
                query: ({id,title} ) => {
                    return {
                        url: '/todo-lists',
                        method: 'POST',
                        body: {id, title}
                    }
                },
                invalidatesTags:["Todolist"]
            }),
        }
    }
})


export const {useGetTodolistsQuery, useAddTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation} = todolistsApi


