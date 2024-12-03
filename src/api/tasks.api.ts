import {
    GetTaskResponseType,
    instanse,
    ResponseType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from 'api/todolists-api';
import {baseApi} from 'api/base-api';
import {TodolistDomainType} from 'features/todolistSlice';

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



export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getTasks: build.query<GetTaskResponseType,  string>({
                query: (todolistId) => {
                    return {
                        url: `/todo-lists/${todolistId}/tasks`,
                        method: 'GET'
                    }
                },
                providesTags:["tasks"]
            }),
            addTask: build.mutation<ResponseType<{ item: TaskType }>,{todolistId: string, title: string} >({
                query: ({todolistId,title }) => {
                    return {
                        url: `/todo-lists/${todolistId}/tasks`,
                        method: 'POST',
                        body: {title}
                    }
                },
                invalidatesTags:["tasks"]
            }),
            deleteTask: build.mutation<ResponseType, {todolistId: string, taskId: string}>({
                query: ({todolistId,taskId}) => {
                    return {
                        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                        method: 'DELETE',
                        body: {todolistId,taskId }
                    }
                },
                invalidatesTags:["tasks"]
            }),
            updateTask: build.mutation<ResponseType<{ item: TaskType }>, {todolistId: string, taskId: string, model:any}>({
                query: ({todolistId,taskId, model} ) => {
                    return {
                        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                        method: 'PUT',
                        body: model
                    }
                },
                invalidatesTags:["tasks"]
            }),
        }
    },
    overrideExisting: true,
})


export const {useGetTasksQuery,useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi