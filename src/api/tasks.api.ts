import {GetTaskResponseType, instanse, ResponseType, TaskType, UpdateTaskModelType} from 'api/todolists-api';

export const tasksAPI={
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
}