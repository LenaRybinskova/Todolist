import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootStateType } from "app/store";
import {BaseResponse} from 'common/types';

export const createAppAsyncThunks = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponse;
  extra?: unknown;

}>();

export type AppThunkApi = ReturnType<typeof createAppAsyncThunks>;
