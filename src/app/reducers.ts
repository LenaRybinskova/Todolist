import {tasksSlice} from 'features/TodolistsList/model/tasks/tasksSlice';
import {todolistSlice} from 'features/TodolistsList/model/todolists/todolistSlice';
import {appReducer} from 'app/appSlice';
import {authReducer} from 'features/auth/model/authSlice';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    tasks: tasksSlice,
    todolists: todolistSlice,
    app: appReducer,
    auth: authReducer,
})


