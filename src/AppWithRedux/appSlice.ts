import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    selectError: (sliceState) => sliceState.error,
    selectStatus: (sliceState) => sliceState.status,
    selectIsInitialized: (sliceState) => sliceState.isInitialized,
  },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
export const { selectError, selectStatus, selectIsInitialized } = appSlice.selectors;
export type appInitialState = ReturnType<typeof appSlice.getInitialState>;

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

/*export type SetStatusACType = ReturnType<typeof setAppStatus>
export type SetErrorACType = ReturnType<typeof setAppErrorAC>
export type SetInitializedACType = ReturnType<typeof setInitializedAC>

export type AppActionType = SetStatusACType | SetErrorACType | SetInitializedACType*/

/*
// REDUX
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}


export const appSlice = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
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

//TC


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
*/
