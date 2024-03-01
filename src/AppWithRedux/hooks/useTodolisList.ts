import {useAppDispatch, useAppSelector} from '../store';
import {useCallback, useEffect} from 'react';
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from '../../features/todolists-reducer';
import {RequestStatusType} from '../app-reducer';


export const useTodolisList = (demo: boolean) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    useEffect(() => {
        if (!demo) {
            dispatch(getTodolistsTC())
        } else {
            return
        }

    }, [])

    return {addTodolist, todolists, status}
}