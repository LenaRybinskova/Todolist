import {appActions} from 'app/appSlice';
import {handleServerAppError} from 'common/utils/handleServerAppError';
import {AppDispatch, AppRootStateType} from 'app/store';
import {BaseResponse} from 'common/types';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';


type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>

export const tryCatchThunk = async <T>(thunkAPI: ThunkAPI, logic: () => Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
        return await logic()
    } catch (e) {
        handleServerAppError(e as { message: string }, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
    }
}