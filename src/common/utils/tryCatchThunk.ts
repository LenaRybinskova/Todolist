import {appActions} from 'app/appSlice';
import {handleServerAppError} from 'common/utils/handleServerAppError';
import {Dispatch} from 'redux';
import {GetThunkAPI} from '@reduxjs/toolkit';


type ThunkAPI_ = {
    dispatch: Dispatch,
    rejectWithValue: any

}
// type ThunkAPI__ = GetThunkAPI<ThunkAPI_>

//BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>
export const tryCatchThunk = async <T>(thunkAPI: ThunkAPI_, logic: () => Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));

        return await logic()

    } catch (e) {
        handleServerAppError(e as { message: string }, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
    }
}