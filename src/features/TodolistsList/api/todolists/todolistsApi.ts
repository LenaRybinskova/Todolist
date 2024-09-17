import {instanse} from 'common/instance/instance';
import {BaseResponse} from 'common/types';
import {TodolistType, UpdateTitleTodolistArgs} from 'features/TodolistsList/api/todolists/todolistsApi.types';


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
    updateTodolist(args: UpdateTitleTodolistArgs) {
        const {todolistId, title} = args
        return instanse.put<BaseResponse>(`/todo-lists/${todolistId}`, {title});
    },
};


