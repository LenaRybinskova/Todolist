import {useAppSelector} from '../../../AppWithRedux/store';
import {useCallback, useEffect, useMemo} from 'react';
import {addTaskTC, getTaskTC} from '../../tasks-reducer';
import {removeTodolistTC, TodolistDomainType, changeTitleTodolistTC, todolistsActions} from '../../todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useDispatch} from 'react-redux';


export const UseTodolist = ({id, filter, title}: TodolistDomainType, demo?: boolean) => {

    let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[id])
    console.log('filter', filter)
    const dispatch = useDispatch() // useAppDispatch не работает

    useEffect(() => {
        if (!demo) {
            dispatch(getTaskTC(id))
        } else {
            return
        }
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, id))
    }, [dispatch])

    const removeTodolist = () => {
        dispatch(removeTodolistTC(id))
    }
    const changeTodolistTitle = useCallback((title: string) => {

        dispatch(changeTitleTodolistTC(id, {title: title}))
    }, [dispatch, id, title])

    const onAllClickHandler = useCallback(() => dispatch(todolistsActions.updateTodolist({
        todolistId: id,
        model: {filter: 'all'}
    })), [dispatch, id])
    const onActiveClickHandler = useCallback(() => dispatch(todolistsActions.updateTodolist({
        todolistId: id,
        model: {filter: 'active'}
    })), [dispatch, id])
    const onCompletedClickHandler = useCallback(() => dispatch(todolistsActions.updateTodolist({
        todolistId: id,
        model: {filter: 'completed'}
    })), [dispatch, id])

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

    console.log('tasksForFilter', tasks)
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

