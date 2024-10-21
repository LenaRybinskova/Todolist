import axios, {AxiosResponse} from 'axios';

export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

export type ResponseType<T = {}> = {
    data: T;
    resultCode: number;
    fieldsErrors: string[];
    messages: string[];
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



export const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {'API-KEY': '2c45728a-68be-4862-8b0c-8cd42989c7e6'}
});

export const todolistAPI = {
    getTodolists() {
        return instanse.get<TodolistType[]>('/todo-lists');
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {
            title
        });
    },
    deleteTodolist(todolistId: string): Promise<AxiosResponse<ResponseType>> {
        return instanse.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string): Promise<AxiosResponse<ResponseType>> {
        return instanse.put<ResponseType>(`/todo-lists/${todolistId}`, {title});
    },
};




