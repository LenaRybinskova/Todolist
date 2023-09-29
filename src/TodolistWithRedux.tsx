import React, {ChangeEvent, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox} from '@mui/material';
import {TodolistType} from './AppWithReducers';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {ButtonWithRedux} from './ButtonWithRedux';
import {Task} from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = React.memo(({todolist}: PropsType) => {
    console.log('TodolistWithRedux')

    const {id, filter, title} = todolist

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


    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'all')), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'active')), [dispatch])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'completed')), [dispatch])

// это у нас как бы расчет математический, его надо обернуть в useMemo()
    tasks = useMemo(() => {
        if (filter === 'active') {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (filter === 'completed') {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [tasks, tasks.filter])


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasks.map(t => <Task key={t.id} task={t} todolistId={id}/>)}
        </div>
        <div>
            <ButtonWithRedux variant={filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                             color={'inherit'} name={'All'}/>
            <ButtonWithRedux variant={filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}
                             color={'primary'} name={'Active'}/>
            <ButtonWithRedux variant={filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}
                             color={'secondary'} name={'Completed'}/>
        </div>
    </div>
})


