import {instanse} from 'common/instance/instance';
import {BaseResponse} from 'common/types';
import {
    AddTaskArgs,
    GetTaskResponseType,
    RemoveTaskArgs,
    TaskType,
    UpdateTaskArgs
} from 'features/TodolistsList/api/tasks/tasksApi.types';


export const tasksApi = {
    getTasks(todolistId: string) {
        return instanse.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(args:AddTaskArgs) {
        const {todolistId, title} = args;
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
}