const initialState:InitialStateType = {
    status: 'idle' ,
    error: null
}


export const appReducer = (state:InitialStateType = initialState, action: AppActionType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status:action.status}
        case 'APP/SET-ERROR':
            return {...state, error:action.error}
        default:
            return {...state}
    }
};

//action
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setAppErrorAC = (error: string |null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

//types
export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: null | string
}
export type SetStatusACType = ReturnType<typeof setAppStatusAC>
export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type AppActionType = SetStatusACType | SetErrorACType
