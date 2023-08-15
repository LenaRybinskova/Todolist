import {FilterValuesType, TodolistType} from '../App';


export const ReducerTodolist = (state: TodolistType[], action: CommonType): TodolistType[] => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        }

        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        case 'CHANGE_TITLE_TODOLIST': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }

        case 'CHANGE_FILTER_TODOLIST': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }

        default:
            return state
    }
}

export type addTodolistACType = ReturnType<typeof AddTodolistAC>
export type removeTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type changeFilterACType = ReturnType<typeof ChangeFilterAC>
export type CommonType = addTodolistACType | removeTodolistACType | changeTodolistTitleACType | changeFilterACType

export const AddTodolistAC = (title: string, newId: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title: title,
            id: newId
        }
    } as const
}

export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: id
        }
    } as const
}

export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TITLE_TODOLIST',
        payload: {
            id: id,
            title: title
        }
    } as const
}

export const ChangeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE_FILTER_TODOLIST',
        payload: {
            filter: value,
            id: todolistId
        }
    } as const
}
