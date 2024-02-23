import {todolistAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type GetTodolistACType = ReturnType<typeof getTodolistAC>
export type UpdateTodolistType = ReturnType<typeof updateTodolistAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>

type ActionsType =

    RemoveTodolistActionType
    | GetTodolistACType
    | UpdateTodolistType
    | CreateTodolistACType


const initialState: TodolistDomainType[] = [
    /*    {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}*/
]

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {

    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return (state.filter((tl) => tl.id != action.id))
        case 'UPDATE-TODOLIST':
            return [...state.map(tl => tl.id === action.todolistId ? {...tl, ...action.model} : tl)]
        case 'CREATE-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        default:
            return state
    }
}

export const getTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}
export const createTodolistAC = (todolist: TodolistType) => {
    return {type: 'CREATE-TODOLIST', todolist} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const updateTodolistAC = (todolistId: string, model: TodolistDomainModelType) => {
    return {type: 'UPDATE-TODOLIST', todolistId, model} as const
}


//------------------------------------------
export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists().then(res => dispatch(getTodolistAC(res.data)))
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title).then(res => dispatch(createTodolistAC(res.data.data.item)))
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId).then(res => dispatch(removeTodolistAC(todolistId)))
    }
}

type TodolistDomainModelType = {
    id?: string,
    addedDate?: string,
    order?: number
    title?: string
    filter?: FilterValuesType
}
export const updateTodolistTC = (todolistId: string, model: TodolistDomainModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const todolist = getState().todolists.find(tl => tl.id === todolistId)
        if (!todolist) {
            console.log('todolist is not exist')
            return
        }

        const modelApi = {
            id: todolist.id,
            addedDate: todolist.addedDate,
            order: todolist.order,
            title: todolist.title,
            ...model
        }

        todolistAPI.updateTodolist(todolistId, modelApi.title).then(res => dispatch(updateTodolistAC(todolistId, model)))
    }
}