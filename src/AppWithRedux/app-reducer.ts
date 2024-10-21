const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALISED':
            return {...state, isInitialized: action.value}
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
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALISED',
        value
    } as const
}

//types
export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized:boolean
}
export type SetStatusACType = ReturnType<typeof setAppStatusAC>
export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type SetInitializedACType = ReturnType<typeof setInitializedAC>
export type AppActionType = SetStatusACType | SetErrorACType | SetInitializedACType
