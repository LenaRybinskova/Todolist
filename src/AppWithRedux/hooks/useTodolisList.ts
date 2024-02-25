import {useAppDispatch, useAppSelector} from '../../state/store';
import {useCallback, useEffect} from 'react';
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from '../../state/todolists-reducer';


export const useTodolisList=()=>{
    let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist=useCallback((title: string)=> {
        dispatch(createTodolistTC(title))},[dispatch])


    useEffect(()=>{
        dispatch(getTodolistsTC())
    },[])

    return {addTodolist,todolists}
}