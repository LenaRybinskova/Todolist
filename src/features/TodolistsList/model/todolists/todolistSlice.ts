import {todolistAPI, TodolistType} from 'features/TodolistsList/api/todolists/todolists-api';
import {AppRootStateType, AppThunk} from 'app/store';
import {appActions, RequestStatusType} from 'app/appSlice';
import {handleServerNetworkError} from 'common/utils/handleServerNetworkError';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearState} from 'common/actions/common.actions';
import {handleServerAppError} from 'common/utils/handleServerAppError';
import {createAppAsyncThunks} from 'common/utils';
import {ResultCode} from 'common/enums';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};

type TodolistDomainModelType = {
    id?: string;
    addedDate?: string;
    order?: number;
    title?: string;
    filter?: FilterValuesType;
    entityStatus?: RequestStatusType;
};

export type ResponseErrorType = {
    resultCode: number;
    messages: string[];
    data: {};
};

//state
/* [
      {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
]*/

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        /* getTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
             return action.payload.todolists.forEach((tl) => state.push({...tl, filter: 'all', entityStatus: 'idle'}));
         },*/
        /*removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) state.splice(index, 1);
        },*/
        updateTodolist: (state, action: PayloadAction<{ todolistId: string; model: TodolistDomainModelType }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
            if (index > -1) {
                state[index] = {...state[index], ...action.payload.model};
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) todolist.entityStatus = action.payload.entityStatus;
        },
        /*        createTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
                    state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
                },*/
    },
    extraReducers: (builder) => {
        builder.addCase(clearState, () => {
            return [];
        });
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.forEach((tl: TodolistType) => state.push({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        });
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state.splice(index, 1);
        });
    },
});

export const todolistSlice = todolistsSlice.reducer;
export const todolistsActions = todolistsSlice.actions;
export type todolistsInitialState = ReturnType<typeof todolistsSlice.getInitialState>;


//TC
export const fetchTodolists = createAppAsyncThunks<{
    todolists: TodolistType[]
}, undefined>(`${todolistsSlice.name}/getTodolists`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}));
        const res = await todolistAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}));
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const createTodolist = createAppAsyncThunks<{
    todolist: TodolistType
}, string>(`${todolistsSlice.name}/createTodolist`, async (args, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await todolistAPI.createTodolist(args);
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {todolist: res.data.data.item}
        } else {
            handleServerNetworkError(res.data, thunkAPI.dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch);
        return rejectWithValue(null)
    }
})

export const removeTodolist = createAppAsyncThunks<{
    todolistId: string
}, string>(`${todolistsSlice.name}/removeTodolist`, async (id, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}));
        const res = await todolistAPI.deleteTodolist(id)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'})); // закончили крутилку
            return {todolistId: id}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerAppError(e, dispatch);
        return rejectWithValue(null)
    }
})

/*export const removeTodolistTC = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}));
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}));
        todolistAPI
            .deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({todolistId: id}));
                    dispatch(appActions.setAppStatus({status: 'succeeded'})); // закончили крутилку
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error: AxiosError<ResponseErrorType>) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};*/

export const changeTitleTodolistTC = (todolistId: string, model: TodolistDomainModelType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const todolist = getState().todolists.find((tl) => tl.id === todolistId);
        if (!todolist) {
            console.log('todolist is not exist');
            return;
        }

        const modelApi = {
            id: todolist.id,
            addedDate: todolist.addedDate,
            order: todolist.order,
            title: todolist.title,
            filter: todolist.filter,
            ...model,
        };
        dispatch(appActions.setAppStatus({status: 'loading'}));
        todolistAPI
            .updateTodolist(todolistId, modelApi.title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    /*  dispatch(todolistsActions.removeTodolist({todolistId}))*/
                    dispatch(todolistsActions.updateTodolist({todolistId: todolistId, model: {title: modelApi.title}}));
                    dispatch(appActions.setAppStatus({status: 'succeeded'})); // закончили крутилку
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e: AxiosError<ResponseErrorType>) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};

export const todolistsThunks = {fetchTodolists, createTodolist, removeTodolist};

/*
//REDUX
import {todolistAPI, TodolistType} from '../api/todolistsList-api';
import {AnyAction, Dispatch} from 'redux';
import {AppActionsType, AppRootStateType, AppThunk} from '../app/store';
import {ThunkAction} from 'redux-thunk';
import {RequestStatusType, setAppErrorAC, setAppStatusAC, SetStatusACType} from '../app/app-reducer';
import {debug} from 'util';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {number} from 'prop-types';
import {AxiosError} from 'axios';


const initialState: TodolistDomainType[] = [
    /!*    {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}*!/
]
export const todolistSlice = (state = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolistsList.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return (state.filter((tl) => tl.id != action.id))
        case 'UPDATE-TODOLIST':
            return [...state.map(tl => tl.id === action.todolistId ? {...tl, ...action.model} : tl)]
        case 'CREATE-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

//action
export const getTodolistAC = (todolistsList: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolistsList
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
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-ENTITY-STATUS', id, entityStatus} as const
}

//thunk
export const getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then(res =>
                dispatch(getTodolistAC(res.data)))
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistAPI.createTodolist(title)
        if(res.data.resultCode===0){
            dispatch(getTodolistsTC())
            dispatch(setAppStatusAC('succeeded'))
        } else{
            handleServerAppError(res.data,dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }

}
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded')) // закончили крутилку
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error: AxiosError<ResponseErrorType>) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}
export const updateTodolistTC = (todolistId: string, model: TodolistDomainModelType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const todolist = getState().todolistsList.find(tl => tl.id === todolistId)
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
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, modelApi.title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded')) // закончили крутилку
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e: AxiosError<ResponseErrorType>) => {
            handleServerNetworkError(e, dispatch)
        })

    }
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type GetTodolistACType = ReturnType<typeof getTodolistAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>

export type TodolistsActionsType =
    RemoveTodolistActionType
    | GetTodolistACType
    | ReturnType<typeof updateTodolistAC>
    | CreateTodolistACType
    | ReturnType<typeof changeTodolistEntityStatusAC>

type TodolistDomainModelType = {
    id?: string,
    addedDate?: string,
    order?: number
    title?: string
    filter?: FilterValuesType
}
export type ResponseErrorType = {
    resultCode: number
    messages: string[]
    data: {}
}


/!*export const _createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title).then(res => {
        //пример, когда сервер возвращает нам созданный ТЛ целиком и мы его диспатчим в редьюсор.
        dispatch(createTodolistAC(res.data.data.item))
        /!*            // примет, когда санка возвращает и диспатчит санку. Те новый ТЛ создался и мы просто вызываем ТС со всеми ТЛ и опи отрисовываются.
                    dispatch(getTodolistsTC())*!/
    })
}*!/*/
