import {TaskPriorities, TaskStatuses} from 'common/enums';

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