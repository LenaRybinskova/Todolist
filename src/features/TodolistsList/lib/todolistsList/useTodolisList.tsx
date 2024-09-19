import {useEffect} from 'react';
import {createTodolist, fetchTodolists, TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistSlice';
import {RequestStatusType} from 'app/appSlice';
import {selectStatusTodolist, selectTodolists} from 'features/TodolistsList/model/todolists/todolist.selectors';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'app/store';
import {selectIsLoggedIn} from 'features/auth/model/authSlice';

export const useTodolisList = (demo: boolean) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists);
    const status = useAppSelector<RequestStatusType>(selectStatusTodolist);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const dispatch = useDispatch(); //useAppDispatch() не работает

    const addTodolist = async (title: string) => {
        return dispatch(createTodolist(title));
    }

    useEffect(() => {
        // запрос за ТЛ пойдет только если залогинены
        if (!demo && isLoggedIn) {
            dispatch(fetchTodolists());
        } else {
            return;
        }
    }, []);

    return {addTodolist, todolists, status, isLoggedIn};
};
