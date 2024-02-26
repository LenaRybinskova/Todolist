import {todolistAPI, TodolistType} from '../api/todolists-api';
import {AnyAction, Dispatch} from 'redux';
import {AppActionsType, AppRootStateType, AppThunk} from './store';
import {ThunkAction} from 'redux-thunk';


const initialState: TodolistDomainType[] = [
    /*    {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}*/
]
export const todolistsReducer = (state = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
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

//action
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

//thunk
export const getTodolistsTC = (): AppThunk => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists().then(res => dispatch(getTodolistAC(res.data)))
    }
}

export const _createTodolistTC = (title: string): AppThunk => (dispatch) => {
        todolistAPI.createTodolist(title).then(res => {
            /*//пример, когда сервер возвращает нам созданный ТЛ целиком и мы его диспатчим в редьюсор.
            dispatch(createTodolistAC(res.data.data.item))*/
            // примет, когда санка возвращает и диспатчит санку. Те новый ТЛ создался и мы просто вызываем ТС со всеми ТЛ и опи отрисовываются.
            dispatch(getTodolistsTC())
        })
    }


export const createTodolistTC = (title: string): AppThunk =>
    async dispatch => {
    try {
        await todolistAPI.createTodolist(title)
        dispatch(getTodolistsTC())
    }
    catch (e){
        throw new Error()
    }

}

export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId).then(res => dispatch(removeTodolistAC(todolistId)))
    }
}
export const updateTodolistTC = (todolistId: string, model: TodolistDomainModelType): AppThunk => {
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

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type GetTodolistACType = ReturnType<typeof getTodolistAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>

export type TodolistsActionsType =
    RemoveTodolistActionType
    | GetTodolistACType
    | ReturnType<typeof updateTodolistAC>
    | CreateTodolistACType

type TodolistDomainModelType = {
    id?: string,
    addedDate?: string,
    order?: number
    title?: string
    filter?: FilterValuesType
}