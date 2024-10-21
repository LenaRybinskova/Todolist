import {TodolistType} from '../api/todolists-api';
import {RequestStatusType} from '../AppWithRedux/app-reducer';


const initialState: TodolistDomainType[] = [
    /*    {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
          {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}*/
];
export const todolistsReducer = (
    state = initialState,
    action: TodolistsActionsType
): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map((tl) => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }));
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id != action.id);
        case 'UPDATE-TODOLIST':
            return [
                ...state.map((tl) =>
                    tl.id === action.todolistId ? {...tl, ...action.model} : tl
                )
            ];
        case 'CREATE-TODOLIST':
            return [
                {...action.todolist, filter: 'all', entityStatus: 'idle'},
                ...state
            ];
        case 'CHANGE-ENTITY-STATUS':
            return state.map((tl) =>
                tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl
            );
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) =>
                tl.id === action.id ? {...tl, filter: action.filter} : tl
            );
        default:
            return state;
    }
};

//actions
export const getTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const;
};
export const createTodolistAC = (todolist: TodolistType) => {
    return {type: 'CREATE-TODOLIST', todolist} as const;
};
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
};
export const updateTodolistAC = (
    todolistId: string,
    model: TodolistDomainModelType
) => {
    return {type: 'UPDATE-TODOLIST', todolistId, model} as const;
};
export const changeTodolistEntityStatusAC = (
    id: string,
    entityStatus: RequestStatusType
) => {
    return {type: 'CHANGE-ENTITY-STATUS', id, entityStatus} as const;
};
export const changeTodolistFilterAC = (
    id: string,
    filter: FilterValuesType
) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};


//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type GetTodolistACType = ReturnType<typeof getTodolistAC>;
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistFilterACType = ReturnType<
    typeof changeTodolistFilterAC
>;

export type TodolistsActionsType =
    | RemoveTodolistActionType
    | GetTodolistACType
    | ReturnType<typeof updateTodolistAC>
    | CreateTodolistACType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ChangeTodolistFilterACType;

export type TodolistDomainModelType = {
    id?: string;
    addedDate?: string;
    order?: number;
    title?: string;
    filter?: FilterValuesType;
};
export type ResponseErrorType = {
    resultCode: number;
    messages: string[];
    data: {};
};

/*export const _createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodolist(title).then(res => {
        //пример, когда сервер возвращает нам созданный ТЛ целиком и мы его диспатчим в редьюсор.
        dispatch(createTodolistAC(res.data.data.item))
        /!*            // примет, когда санка возвращает и диспатчит санку. Те новый ТЛ создался и мы просто вызываем ТС со всеми ТЛ и опи отрисовываются.
                    dispatch(getTodolistsTC())*!/
    })
}*/
