// import {AppDispatch, AppRootStateType} from 'app/store';
// import {BaseResponse} from 'common/types';
// import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';


//type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>

export const tryCatchThunk = async <T>(thunkAPI: any, logic: () => Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        return await logic()
    } catch (e) {
        console.log('catch ', e)
        return thunkAPI.rejectWithValue(null)
    }
}