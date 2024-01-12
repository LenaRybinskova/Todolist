import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {useCallback, useMemo} from 'react';
import {addTaskAC} from '../../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../../state/todolists-reducer';
import {TaskType} from '../TodolistWithRedux';
import {TodolistType} from '../../AppWithReducers';


export const UseTodolistWithRedux = ({id, filter, title}:TodolistType) => {


    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id))
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch, id, title])


    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'all')), [dispatch,id])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'active')), [dispatch,id])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'completed')), [dispatch,id])

// это у нас как бы расчет математический, его надо обернуть в useMemo()
    tasks = useMemo(() => {
        if (filter === 'active') {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (filter === 'completed') {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [tasks, filter])


    return {title,changeTodolistTitle,removeTodolist,addTask,tasks,onAllClickHandler,onActiveClickHandler, onCompletedClickHandler,id,filter}

}

