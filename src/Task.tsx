import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}


export const Task =React.memo((props: TaskPropsType) => {
    console.log("Task")
    const dispatch=useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    }
    // считаю правильнее обернуть в юзколлбек
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    },[dispatch,props.task.id,props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone} color="primary" onChange={onChangeHandler}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>


} )

