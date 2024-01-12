import React, { useCallback, useMemo} from 'react';
import {AddItemForm} from '../AddItemsForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TodolistType} from '../AppWithReducers';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC} from '../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../state/todolists-reducer';
import ButtonContainer from '../ButtonWithRedux/ButtonWithRedux';
import TaskWithRedux from '../Task/TaskWithRedux';
import {UseTodolistWithRedux} from './hooks/useTodolistWithRedux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = React.memo(({todolist}: PropsType) => {
    console.log('TodolistWithRedux',todolist.title  )


    const {title,changeTodolistTitle,removeTodolist,addTask,tasks,onAllClickHandler,onActiveClickHandler, onCompletedClickHandler,id,filter}=UseTodolistWithRedux({...todolist})

    /*let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

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
*/

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasks.map(t => <TaskWithRedux key={t.id} task={t} todolistId={id}/>)}
        </div>
        <div>
            <ButtonContainer variant={filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler} color={'inherit'}>All</ButtonContainer>
            <ButtonContainer variant={filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler} color={'primary'}>Active</ButtonContainer>
            <ButtonContainer variant={filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler} color={'secondary'}>Completed</ButtonContainer>
        </div>
    </div>
})


