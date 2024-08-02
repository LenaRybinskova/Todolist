import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootStateType } from "AppWithRedux/store";

export const createAppAsyncThunks = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null;
}>();
