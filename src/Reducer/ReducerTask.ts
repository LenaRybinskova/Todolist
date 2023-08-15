import {TasksStateType} from '../App';
import {v1} from 'uuid';

export const ReducerTask = (state: TasksStateType, action: CommonTYpe): TasksStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            const TaskID = v1()
            const newTask = {id: TaskID, title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]}
        }

        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }

        case 'CHANGE_STATUS_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }

        case 'CHANGE_TITLE_TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t =>t.id=== action.payload.id ?{ ...t, title:action.payload.newTitle} :t)}
        }

        case "ADD_EMPTY_TASK": {
            return {...state, [action.payload.todolistId]: []}
        }

        default:
            return state

    }
}


export type CommonTYpe = AddTaskACType | RemoveTaskACType | changeStatusTaskACType | changeTaskTitleAC | AddEmptyTaskAC
export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type changeStatusTaskACType = ReturnType<typeof ChangeStatusTaskAC>
export type changeTaskTitleAC = ReturnType<typeof ChangeTaskTitleAC>
export type AddEmptyTaskAC=ReturnType<typeof AddEmptyTaskAC>


export const AddTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const RemoveTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}

export const ChangeStatusTaskAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_STATUS_TASK',
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

export const ChangeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE_TITLE_TASK',
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}

export const AddEmptyTaskAC =(newId:string)=>{
    return{
        type: "ADD_EMPTY_TASK",
        payload:{
            todolistId: newId
        }
    } as const
}