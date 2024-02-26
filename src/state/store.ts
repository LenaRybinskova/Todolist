import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | TasksActionsType

//сделали универс диспач, чтобы мог дисп и эакшены и санки
export type AppDispatchType=ThunkDispatch<AppRootStateType,unknown,AppActionsType>
// сделали универс типизацию Thunk для всех санк
export type AppThunk<ReturnType=void>=ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector:TypedUseSelectorHook<AppRootStateType>=useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;


