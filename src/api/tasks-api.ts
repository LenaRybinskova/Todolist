import {AxiosResponse} from 'axios';
import {instanse, ResponseType} from '../../src/api/todolists-api';


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi,
    Ungently,
    Later = 4
}

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


export const taskAPI = {
    getTasks(todolistId: string): Promise<AxiosResponse<GetTaskResponseType>> {
        return instanse.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string):Promise<ResponseType<{ item: TaskType }>>{
        return instanse.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title}).then(res=>res.data);
    },
    deleteTask(
        todolistId: string,
        taskId: string
    ): Promise<AxiosResponse<ResponseType>> {
        return instanse.delete<ResponseType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`
        );
    },
    updateTask(
        todolistId: string,
        taskId: string,
        model: UpdateTaskModelType
    ): Promise<AxiosResponse<ResponseType>> {
        return instanse.put<ResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            model
        );
    }
}


