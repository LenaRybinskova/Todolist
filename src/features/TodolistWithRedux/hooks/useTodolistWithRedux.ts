import {useAppDispatch, useAppSelector} from '../../../state/store';
import {useCallback, useEffect, useMemo} from 'react';
import {addTaskTC, getTaskTC} from '../../../state/tasks-reducer';
import {removeTodolistTC, TodolistDomainType, updateTodolistTC} from '../../../state/todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';


export const UseTodolistWithRedux = ({id, filter, title}: TodolistDomainType) => {

    let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[id])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTaskTC(id))
    },[])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, id))
    }, [dispatch])

    const removeTodolist = () => {
        dispatch(removeTodolistTC(id))
    }
    const changeTodolistTitle = useCallback((title: string) => {

        dispatch(updateTodolistTC(id, {title:title}))
    }, [dispatch, id, title])

    const onAllClickHandler = useCallback(() => dispatch(updateTodolistTC(id, {filter:'all'})), [dispatch, id])
    const onActiveClickHandler = useCallback(() => dispatch(updateTodolistTC(id, {filter:'active'})), [dispatch, id])
    const onCompletedClickHandler = useCallback(() => dispatch(updateTodolistTC(id, {filter:'completed'})), [dispatch, id])

// это у нас как бы расчет математический, его надо обернуть в useMemo()
    tasks = useMemo(() => {
        if (filter === 'active') {
            tasks = tasks.filter(t => t.status === TaskStatuses.New);
        }
        if (filter === 'completed') {
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
        }
        return tasks
    }, [tasks, filter])

    return {
        title,
        changeTodolistTitle,
        removeTodolist,
        addTask,
        tasks,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        id,
        filter
    }
}

